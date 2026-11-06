"use client";

import { useEffect, useRef, useState } from "react";
import { defaultOptionId, getOption, orderOptions } from "@/data/order-options";
import type { OrderField } from "@/data/types";
import { PREFILL_EVENT, buildMessage, messengerUrl, whatsappUrl, type OrderValues, type PrefillDetail } from "@/lib/order";
import { Button } from "./ui/Button";
import { MessengerIcon, WhatsAppIcon } from "./ui/Icons";

const field =
  "min-h-[46px] w-full rounded-lg border-[1.5px] border-line bg-bg px-3 py-2.5 text-base text-ink focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/30";

const initial: OrderValues = { optionId: defaultOptionId, primary: "", secondary: "", name: "", city: "", note: "" };

/**
 * Change de besoin. Un champ de détail est vidé si son libellé n'est plus le même,
 * et la note est vidée quand on passe à un autre type de demande (batterie vers abonnement IA, par exemple).
 */
function switchOption(v: OrderValues, optionId: string): OrderValues {
  const prev = getOption(v.optionId);
  const next = getOption(optionId);
  const samePrimary = prev.primary?.label === next.primary?.label;
  const sameSecondary = prev.secondary?.label === next.secondary?.label;
  return {
    ...v,
    optionId,
    primary: samePrimary ? v.primary : "",
    secondary: sameSecondary ? v.secondary : "",
    note: samePrimary && sameSecondary ? v.note : "",
  };
}

type TextKey = "primary" | "secondary" | "name" | "city" | "note";

export function OrderForm() {
  const [values, setValues] = useState<OrderValues>(initial);
  const [status, setStatus] = useState("");
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

  const set = (key: TextKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const details = (
    [
      { key: "primary", id: "f-primary", def: option.primary },
      { key: "secondary", id: "f-secondary", def: option.secondary },
    ] as { key: "primary" | "secondary"; id: string; def: OrderField | null }[]
  ).filter((d): d is { key: "primary" | "secondary"; id: string; def: OrderField } => d.def !== null);

  /** Copie le message. Sert de secours si Messenger n'affiche pas le texte pré-rempli. */
  async function copyMessage(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch {
      return false;
    }
  }

  async function onMessenger() {
    const copied = await copyMessage();
    setStatus(
      copied
        ? "Messenger s'ouvre. Si votre message n'apparaît pas, collez-le (appui long, puis Coller) et envoyez."
        : "Messenger s'ouvre. Si votre message n'apparaît pas, copiez le texte de l'aperçu ci-dessus et collez-le.",
    );
  }

  async function onCopyOnly() {
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

        {details.map((d) => (
          <div key={d.key} className={`grid min-w-0 gap-1.5 ${details.length === 1 ? "sm:col-span-2" : ""}`}>
            <label htmlFor={d.id} className="text-sm font-bold">{d.def.label}</label>
            <input
              id={d.id}
              className={field}
              value={values[d.key]}
              onChange={set(d.key)}
              placeholder={d.def.placeholder}
              autoComplete="off"
            />
          </div>
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
          <label htmlFor="f-note" className="text-sm font-bold">{option.note.label}</label>
          <textarea
            id="f-note"
            className={`${field} min-h-[84px] resize-y`}
            value={values.note}
            onChange={set("note")}
            placeholder={option.note.placeholder}
          />
        </div>
      </div>

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
          <Button variant="messenger" href={fb} external onClick={onMessenger} size="lg">
            <MessengerIcon />
            Envoyer sur Messenger
          </Button>
        ) : null}
        {wa ? (
          <Button variant="whatsapp" href={wa} external size="lg">
            <WhatsAppIcon />
            Envoyer sur WhatsApp
          </Button>
        ) : null}
        {!fb && !wa ? (
          <Button variant="solid" onClick={onCopyOnly} size="lg" className="sm:col-span-2">
            Copier le message
          </Button>
        ) : null}
      </div>
      <div role="status" aria-live="polite" className="min-h-[22px] text-sm font-bold text-ok">{status}</div>
      <p className="text-sm text-muted">
        Un clic ouvre la conversation avec Ofisialy Tech, votre message est déjà prêt. Il ne reste qu&apos;à appuyer sur Envoyer.
      </p>
    </form>
  );
}
