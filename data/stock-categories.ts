/** Catégories du menu « Accessoires » de l'admin, avec le choix du formulaire associé. */
export type StockCategoryId = "batterie" | "clavier" | "rack" | "disque" | "autre";

export const stockCategories: { id: StockCategoryId; label: string; optionId: string }[] = [
  { id: "batterie", label: "Batteries", optionId: "batterie-interne" },
  { id: "clavier", label: "Claviers", optionId: "clavier-interne" },
  { id: "rack", label: "Racks", optionId: "rack-30" },
  { id: "disque", label: "Disques", optionId: "disque-ssd" },
  { id: "autre", label: "Autres", optionId: "autre" },
];
