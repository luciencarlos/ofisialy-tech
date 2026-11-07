import type { ReferenceTip } from "./types";

export const referenceTips: ReferenceTip[] = [
  {
    title: "Batterie",
    parts: [
      "Repérez la capacité en ",
      { code: "Wh" },
      " sur l'étiquette de l'ancienne batterie, par exemple ",
      { code: "42 Wh" },
      ". Batterie interne ? Sous Windows, tapez ",
      { code: "powercfg /batteryreport" },
      " dans l'invite de commandes, puis ouvrez le fichier indiqué : la « Design capacity » est en mWh (42 000 mWh = 42 Wh).",
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
