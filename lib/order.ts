import { siteConfig } from "@/config/site";
import { getOption } from "@/data/order-options";

export type OrderValues = {
  optionId: string;
  /** Valeur du premier champ de détail (son libellé dépend du besoin choisi). */
  primary: string;
  /** Valeur du second champ de détail. */
  secondary: string;
  name: string;
  city: string;
  note: string;
};

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
 */
export function messengerUrl(message?: string): string | null {
  const raw = siteConfig.contact.messenger.trim();
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
