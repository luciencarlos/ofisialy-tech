"use client";

import { useEffect, useRef, useState } from "react";
import { defaultOptionId, getOption, orderOptions } from "@/data/order-options";
import type { OrderField } from "@/data/types";
import {
  PREFILL_EVENT,
  buildMessage,
  fieldErrors,
  fieldIds,
  messengerUrl,
  whatsappUrl,
  type FieldKey,
  type OrderValues,
  type PrefillDetail,
} from "@/lib/order";
import { Button } from "./ui/Button";
import { MessengerIcon, WhatsAppIcon } from "./ui/Icons";

const field =
  "min-h-[46px] w-full rounded-lg border-[1.5px] border-line bg-bg px-3 py-2.5 text-base text-ink focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/30";

/** Rouge des champs obligatoires : plus clair en mode sombre pour rester lisible. */
const redText = "text-[#c62828] dark:text-[#ff7b7b]";
const redBorder = "border-[#c62828] dark:border-[#ff7b7b]";

const initial: OrderValues = {
  optionId: defaultOptionId,
  primary: "",
  secondary: "",
  measure: "",
  name: "",
  city: "",
  note: "",
};

/**
 * Change de besoin. Un champ de détail est vidé si son libellé n'est plus le même,
 * et la note est vidée quand on passe à un autre type de demande (batterie vers abonnement IA, par exemple).
 */
function switchOption(v: OrderValues, optionId: string): OrderValues {
  const prev = getOption(v.optionId);
  const next = getOption(optionId);
  const samePrimary = prev.primary?.label === next.primary?.label;
  const sameSecondary = prev.secondary?.label === next.secondary?.label;
  const sameMeasure = prev.measure?.label === next.measure?.label;
  return {
    ...v,
    optionId,
    primary: samePrimary ? v.primary : "",
    secondary: sameSecondary ? v.secondary : "",
    measure: sameMeasure ? v.measure : "",
    note: samePrimary && sameSecondary ? v.note : "",
  };
}

type DetailKey = "primary" | "secondary" | "measure";
type TextKey = FieldKey | "name" | "city";

/** Étoile rouge d'un champ obligatoire. Les lecteurs d'écran lisent « obligatoire ». */
function RequiredMark() {
  return (
    <span className={`font-bold ${redText}`}>
      <span aria-hidden="true">*</span>
      <span className="sr-only"> obligatoire</span>
    </span>
  );
}

type DetailFieldProps = {
  id: string;
  def: OrderField;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  wide: boolean;
  numeric?: boolean;
};

/** Un champ de détail : libellé (avec étoile si obligatoire), saisie, unité, aide et erreur. */
function DetailField({ id, def, value, onChange, error, wide, numeric }: DetailFieldProps) {
  const describedBy = [def.help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
  return (
    <div className={`grid min-w-0 gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-sm font-bold">
        {def.label}
        {def.unit ? ` (en ${def.unit})` : ""}
        {def.required ? <> <RequiredMark /></> : null}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`${field} ${def.unit ? "pr-14" : ""} ${error ? redBorder : ""}`}
          value={value}
          onChange={onChange}
          placeholder={def.placeholder}
          inputMode={numeric ? "decimal" : undefined}
          autoComplete="off"
          required={def.required}
          aria-required={def.required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
        />
        {def.unit ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-muted"
          >
            {def.unit}
          </span>
        ) : null}
      </div>
      {def.help ? (
        <p id={`${id}-help`} className="text-[13.5px] text-muted">
          {def.help}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className={`text-sm font-bold ${redText}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function OrderForm() {
  const [values, setValues] = useState<OrderValues>(initial);
  const [status, setStatus] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const outRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { optionId, note } = (e as CustomEvent<PrefillDetail>).detail;
      if (orderOptions.some((o) => o.id === optionId)) {
        setValues((v) => ({ ...switchOption(v, optionId), note: note ?? v.note }));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const option = getOption(values.optionId);
  const message = buildMessage(values);
  const wa = whatsappUrl(message);
  const fb = messengerUrl(message);

  const errors = fieldErrors(values);
  const order: FieldKey[] = ["primary", "secondary", "measure", "note"];
  const missing = (Object.keys(errors) as FieldKey[]).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const ready = missing.length === 0;
  const hasRequired = [option.primary, option.secondary, option.measure, option.note].some((f) => f?.required);

  const set = (key: TextKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const fields = (
    [
      { key: "primary", def: option.primary, numeric: false },
      { key: "secondary", def: option.secondary, numeric: false },
      { key: "measure", def: option.measure ?? null, numeric: true },
    ] as { key: DetailKey; def: OrderField | null; numeric: boolean }[]
  ).filter((f): f is { key: DetailKey; def: OrderField; numeric: boolean } => f.def !== null);

  /** Copie le message. Sert de secours si Messenger n'affiche pas le texte pré-rempli. */
  async function copyMessage(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch {
      return false;
    }
  }

  /** Bloque l'envoi tant qu'un champ obligatoire manque, et ramène le client sur le premier. */
  function guard(e: React.MouseEvent<HTMLElement>): boolean {
    if (ready) return true;
    e.preventDefault();
    setShowErrors(true);
    setStatus("");
    document.getElementById(fieldIds[missing[0]])?.focus();
    return false;
  }

  async function onMessenger(e: React.MouseEvent<HTMLElement>) {
    if (!guard(e)) return;
    const copied = await copyMessage();
    setStatus(
      copied
        ? "Messenger s'ouvre. Si votre message n'apparaît pas, collez-le (appui long, puis Coller) et envoyez."
        : "Messenger s'ouvre. Si votre message n'apparaît pas, copiez le texte de l'aperçu ci-dessus et collez-le.",
    );
  }

  async function onCopyOnly(e: React.MouseEvent<HTMLElement>) {
    if (!guard(e)) return;
    if (await copyMessage()) {
      setStatus("Message copié. Collez-le dans votre conversation.");
    } else {
      outRef.current?.focus();
      outRef.current?.select();
      setStatus("Message sélectionné. Copiez-le avec Ctrl+C ou en appui long.");
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 rounded-2xl bg-surface p-5 text-ink sm:p-6">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="grid min-w-0 gap-1.5 sm:col-span-2">
          <label htmlFor="f-type" className="text-sm font-bold">Ce que vous cherchez</label>
          <select
            id="f-type"
            className={field}
            value={values.optionId}
            onChange={(e) => setValues((v) => switchOption(v, e.target.value))}
          >
            <optgroup label="Pièces et accessoires">
              {orderOptions.filter((o) => o.kind === "piece").map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </optgroup>
            <optgroup label="Services">
              {orderOptions.filter((o) => o.kind === "service").map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {fields.map((f) => (
          <DetailField
            key={f.key}
            id={fieldIds[f.key]}
            def={f.def}
            value={values[f.key]}
            onChange={set(f.key)}
            error={showErrors ? errors[f.key] : undefined}
            wide={f.key === "measure" || fields.filter((x) => x.key !== "measure").length === 1}
            numeric={f.numeric}
          />
        ))}

        <div className="grid min-w-0 gap-1.5">
          <label htmlFor="f-name" className="text-sm font-bold">Votre nom</label>
          <input id="f-name" className={field} value={values.name} onChange={set("name")} autoComplete="name" />
        </div>
        <div className="grid min-w-0 gap-1.5">
          <label htmlFor="f-city" className="text-sm font-bold">Ville</label>
          <input id="f-city" className={field} value={values.city} onChange={set("city")} autoComplete="address-level2" />
        </div>
        <div className="grid min-w-0 gap-1.5 sm:col-span-2">
          <label htmlFor="f-note" className="text-sm font-bold">
            {option.note.label}
            {option.note.required ? <> <RequiredMark /></> : null}
          </label>
          <textarea
            id="f-note"
            className={`${field} min-h-[84px] resize-y ${showErrors && errors.note ? redBorder : ""}`}
            value={values.note}
            onChange={set("note")}
            placeholder={option.note.placeholder}
            required={option.note.required}
            aria-required={option.note.required || undefined}
            aria-invalid={showErrors && errors.note ? true : undefined}
            aria-describedby={showErrors && errors.note ? "f-note-error" : undefined}
          />
          {showErrors && errors.note ? (
            <p id="f-note-error" role="alert" className={`text-sm font-bold ${redText}`}>
              {errors.note}
            </p>
          ) : null}
        </div>
      </div>

      {hasRequired ? (
        <p className="text-sm text-muted">
          <span aria-hidden="true" className={`font-bold ${redText}`}>*</span> Champ obligatoire
        </p>
      ) : null}

      {option.notice ? (
        <p role="note" className="rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-muted">
          {option.notice}
        </p>
      ) : null}

      <div className="grid gap-2">
        <label htmlFor="f-out" className="font-mono text-xs uppercase tracking-[.08em] text-muted">Aperçu de votre message</label>
        <textarea
          id="f-out"
          ref={outRef}
          readOnly
          value={message}
          className="min-h-[140px] w-full resize-y rounded-lg border-[1.5px] border-dashed border-line bg-bg p-3 font-mono text-[13.5px] leading-[1.55] text-ink"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {fb ? (
          <Button variant="messenger" href={fb} external onClick={onMessenger} size="lg" ariaDisabled={!ready}>
            <MessengerIcon />
            Envoyer sur Messenger
          </Button>
        ) : null}
        {wa ? (
          <Button variant="whatsapp" href={wa} external size="lg" onClick={guard} ariaDisabled={!ready}>
            <WhatsAppIcon />
            Envoyer sur WhatsApp
          </Button>
        ) : null}
        {!fb && !wa ? (
          <Button variant="solid" onClick={onCopyOnly} size="lg" className="sm:col-span-2" ariaDisabled={!ready}>
            Copier le message
          </Button>
        ) : null}
      </div>
      {!ready && !showErrors ? (
        <p className="text-sm font-bold text-muted">
          Remplissez les champs marqués d&apos;une <span className={redText}>étoile rouge *</span> pour pouvoir envoyer votre demande.
        </p>
      ) : null}
      {process.env.NODE_ENV === "development" && !fb ? (
        <p className="rounded-lg border border-dashed border-line bg-bg px-3.5 py-2.5 text-sm text-muted">
          Mode développement : le bouton Messenger apparaît dès que <code className="font-mono">messenger</code> ou{" "}
          <code className="font-mono">facebook</code> est rempli dans <code className="font-mono">config/site.ts</code>.
        </p>
      ) : null}
      <div role="status" aria-live="polite" className="min-h-[22px] text-sm font-bold text-ok">{status}</div>
      <p className="text-sm text-muted">
        Un clic ouvre la conversation avec Ofisialy Tech, votre message est déjà prêt. Il ne reste qu&apos;à appuyer sur Envoyer.
      </p>
    </form>
  );
}
