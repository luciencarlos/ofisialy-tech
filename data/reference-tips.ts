import type { ReferenceTip } from "./types";

export const referenceTips: ReferenceTip[] = [
  {
    title: "Batterie",
    parts: [
      "Lisez l'étiquette de la batterie si elle se retire, par exemple ",
      { code: "42 Wh" },
      ". Sinon, relevez le modèle du PC.",
    ],
  },
  {
    title: "Clavier",
    parts: [
      "Indiquez le modèle du PC et la disposition des touches, ",
      { code: "AZERTY" },
      " ou ",
      { code: "QWERTY" },
      ". Une photo du clavier aide.",
    ],
  },
  {
    title: "Modèle du PC",
    parts: [
      "Il est imprimé sur l'étiquette sous le portable. Une photo de cette étiquette suffit.",
    ],
  },
];
