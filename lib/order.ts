import { siteConfig } from "@/config/site";
import { getOption } from "@/data/order-options";
import type { OrderField } from "@/data/types";

export type OrderValues = {
  optionId: string;
  /** Valeur du premier champ de détail (son libellé dépend du besoin choisi). */
  primary: string;
  /** Valeur du second champ de détail. */
  secondary: string;
  /** Valeur du champ numérique (ex : capacité en Wh), tel que saisi par le client. */
  measure: string;
  name: string;
  city: string;
  note: string;
};

/**
 * Lit le premier nombre saisi ("42", "42 Wh", "48,8"). Renvoie null si le champ est vide,
 * n'est pas un nombre, ou dépasse la valeur maximale du champ.
 */
export function parseMeasure(raw: string, field: OrderField | null | undefined): number | null {
  const m = raw.replace(",", ".").match(/\d+(?:\.\d+)?/);
  if (!m) return null;
  const n = parseFloat(m[0]);
  if (!(n > 0)) return null;
  if (field?.max !== undefined && n > field.max) return null;
  return n;
}

export type FieldKey = "primary" | "secondary" | "measure" | "note";

/** Identifiants HTML des champs de détail, pour ramener le client sur le premier champ à corriger. */
export const fieldIds: Record<FieldKey, string> = {
  primary: "f-primary",
  secondary: "f-secondary",
  measure: "f-measure",
  note: "f-note",
};

const defaultError = (label: string) => `Indiquez « ${label} » pour envoyer votre demande.`;

/** Champs obligatoires vides ou incorrects, avec le message à afficher. Vide = la demande peut partir. */
export function fieldErrors(v: OrderValues): Partial<Record<FieldKey, string>> {
  const option = getOption(v.optionId);
  const errors: Partial<Record<FieldKey, string>> = {};

  if (option.primary?.required && !v.primary.trim()) {
    errors.primary = option.primary.errorMessage ?? defaultError(option.primary.label);
  }
  if (option.secondary?.required && !v.secondary.trim()) {
    errors.secondary = option.secondary.errorMessage ?? defaultError(option.secondary.label);
  }
  if (option.measure?.required && parseMeasure(v.measure, option.measure) === null) {
    errors.measure = option.measure.errorMessage ?? defaultError(option.measure.label);
  }
  if (option.note.required && !v.note.trim()) {
    errors.note = option.note.errorMessage ?? defaultError(option.note.label);
  }
  return errors;
}

export function isOrderReady(v: OrderValues): boolean {
  return Object.keys(fieldErrors(v)).length === 0;
}

export function buildMessage(v: OrderValues): string {
  const option = getOption(v.optionId);
  const lines: string[] = ["Bonjour Ofisialy Tech,"];
  lines.push(
    option.kind === "service"
      ? `Je souhaite un service : ${option.label}.`
      : `Je souhaite commander : ${option.label}.`,
  );
  const details = [
    { field: option.primary, value: v.primary },
    { field: option.secondary, value: v.secondary },
  ];
  for (const { field, value } of details) {
    if (field && value.trim()) lines.push(`${field.label} : ${value.trim()}`);
  }
  const amount = option.measure ? parseMeasure(v.measure, option.measure) : null;
  if (option.measure && amount !== null) {
    const shown = String(amount).replace(".", ",");
    lines.push(`${option.measure.label} : ${shown}${option.measure.unit ? ` ${option.measure.unit}` : ""}`);
  }
  if (v.note.trim()) lines.push(`${option.note.label} : ${v.note.trim()}`);
  if (v.city.trim()) lines.push(`Ville : ${v.city.trim()}`);
  lines.push("Pouvez-vous me confirmer la disponibilité, le prix et le délai ?");
  lines.push(v.name.trim() ? `Merci, ${v.name.trim()}.` : "Merci.");
  return lines.join("\n");
}

export function whatsappUrl(message: string): string | null {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}

/**
 * Lien de conversation Messenger, avec le message pré-rempli (paramètre `text` des liens m.me).
 * Accepte dans config/site.ts : "https://m.me/votrepage", "votrepage"
 * ou l'adresse de la page Facebook (https://www.facebook.com/votrepage).
 * Si `messenger` est vide, le lien est déduit de `facebook`.
 */
export function messengerUrl(message?: string): string | null {
  const raw = (siteConfig.contact.messenger || siteConfig.contact.facebook).trim();
  if (!raw) return null;

  let base = raw;
  if (!/^https?:\/\//i.test(raw)) {
    base = `https://m.me/${raw.replace(/^@/, "")}`;
  } else {
    try {
      const u = new URL(raw);
      if (/(^|\.)facebook\.com$/i.test(u.hostname)) {
        const id = u.pathname === "/profile.php" ? u.searchParams.get("id") : u.pathname.split("/").filter(Boolean)[0];
        if (id) base = `https://m.me/${id}`;
      }
    } catch {
      return null;
    }
  }
  if (!message) return base;
  return `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;
}

/** Événement envoyé par les boutons « Commander » pour présélectionner le formulaire. */
export const PREFILL_EVENT = "ofisialy:prefill";

export type PrefillDetail = { optionId: string; note?: string };

export function prefillOrder(optionId: string, note?: string): void {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { optionId, note } }));
}
