export type OrderOptionKind = "piece" | "service";

/** Un champ du formulaire de commande : son libellé et son exemple de saisie. */
export type OrderField = {
  label: string;
  placeholder: string;
  /** Unité affichée dans le champ et ajoutée au message (ex : "Wh"). Pour un champ numérique. */
  unit?: string;
  /** Le client doit remplir ce champ avant d'envoyer sa demande. */
  required?: boolean;
  /** Valeur maximale acceptée pour un champ numérique. */
  max?: number;
  /** Petit texte d'aide sous le champ. */
  help?: string;
  /** Message affiché si ce champ obligatoire est vide ou incorrect. */
  errorMessage?: string;
};

export type OrderOption = {
  id: string;
  label: string;
  kind: OrderOptionKind;
  /** Premier champ de détail. null = masqué pour ce besoin. */
  primary: OrderField | null;
  /** Second champ de détail. null = masqué pour ce besoin. */
  secondary: OrderField | null;
  /** Champ numérique mis en avant (ex : capacité en Wh d'une batterie). Absent ou null = masqué. */
  measure?: OrderField | null;
  /** Champ de précisions (toujours affiché). */
  note: OrderField;
  /** Mise en garde affichée sous le message, par exemple pour les services avec compte. */
  notice?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductSpec = {
  label: string;
  title: string;
  detail: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  /** Mise en page : "feature" (large, image à gauche), "card" (image en haut), "row" (sans image) */
  layout: "feature" | "card" | "row";
  image?: ProductImage;
  tags?: { items: string[]; highlight?: boolean };
  extra?: string;
  specs?: ProductSpec[];
  cta: { label: string; optionId: string; variant: "solid" | "line" };
};

export type Service = { title: string; text: string };
export type ServiceGroup = { label: string; items: Service[] };

export type TipPart = string | { code: string };
export type ReferenceTip = { title: string; parts: TipPart[] };
