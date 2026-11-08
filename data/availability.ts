import raw from "@/content/disponibilites.json";
import type { SpecAvailability } from "./types";

/** Modèles dont la disponibilité se règle dans /admin > Réglages du site. */
export type ModelKey = "rack30" | "rack31" | "hdd" | "ssd" | "nvme";

type Entry = { statut?: string; note?: string };

const valid = new Set<string>(["en-stock", "sur-commande", "epuise"]);
const saved = raw as unknown as Partial<Record<ModelKey, Entry>>;

/**
 * Disponibilité d'un modèle, lue dans content/disponibilites.json (modifié depuis /admin).
 * Une valeur absente ou invalide donne « Sur commande ».
 */
export function modelAvailability(key: ModelKey): { availability: SpecAvailability; availabilityNote?: string } {
  const entry = saved[key];
  const availability = entry?.statut && valid.has(entry.statut) ? (entry.statut as SpecAvailability) : "sur-commande";
  const note = entry?.note?.trim();
  return note ? { availability, availabilityNote: note } : { availability };
}
