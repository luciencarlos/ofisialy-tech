import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "batteries",
    title: "Batteries pour portables",
    description:
      "Toutes références, pour retrouver une bonne autonomie et un usage sans interruption.",
    layout: "feature",
    image: {
      src: "/images/batteries.webp",
      alt: "Batteries internes et amovibles de portables Dell, Lenovo, HP, Acer et ASUS",
      width: 900,
      height: 313,
    },
    tags: { items: ["Internes (intégrées)", "Amovibles (extractibles)"], highlight: true },
    extra:
      "Une batterie interne se trouve à l'intérieur du boîtier. Une batterie amovible se retire sans outil. Dites-nous laquelle équipe votre PC.",
    cta: { label: "Commander une batterie", optionId: "batterie-interne", variant: "solid" },
  },
  {
    id: "claviers",
    title: "Claviers",
    description: "Claviers internes de portables et claviers externes, pour toutes les marques.",
    layout: "card",
    image: {
      src: "/images/clavier.webp",
      alt: "Clavier interne de portable avec sa nappe de connexion bleue",
      width: 540,
      height: 330,
    },
    tags: { items: ["Pièces d'origine ou qualité équivalente", "Installation facilitée"] },
    cta: { label: "Commander un clavier", optionId: "clavier-interne", variant: "line" },
  },
  {
    id: "racks",
    title: "Racks pour disque dur",
    description:
      "Transformez un HDD ou un SSD 2.5″ en disque portable, sans pilote à installer.",
    layout: "card",
    image: {
      src: "/images/racks.webp",
      alt: "Racks externes Ofisialy Tech pour disque 2.5 pouces, USB 3.0 et USB Type-C",
      width: 900,
      height: 275,
    },
    specs: [
      // Disponibilité : "en-stock", "sur-commande" ou "epuise". Ajoutez availabilityNote: "…" pour un délai.
      { label: "Rack 3.0", title: "USB 3.0", detail: "jusqu'à 5 Gbps", availability: "sur-commande" },
      { label: "Rack 3.1", title: "USB Type-C", detail: "jusqu'à 10 Gbps", availability: "sur-commande" },
    ],
    cta: { label: "Commander un rack", optionId: "rack-30", variant: "line" },
  },
  {
    id: "disques",
    title: "Disques durs et SSD",
    description:
      "Pour remplacer un disque lent, agrandir le stockage ou réinstaller un système sur une base neuve.",
    layout: "row",
    specs: [
      { label: "HDD", title: "Disque dur", detail: "2.5″, grande capacité", availability: "sur-commande" },
      { label: "SSD", title: "SSD SATA", detail: "2.5″, démarrage rapide", availability: "sur-commande" },
      { label: "NVMe", title: "SSD NVMe", detail: "M.2, pour les PC compatibles", availability: "sur-commande" },
    ],
    cta: { label: "Demander un disque", optionId: "disque-ssd", variant: "line" },
  },
];
