import type { OrderField, OrderOption } from "./types";

/**
 * Chaque besoin du menu « Ce que vous cherchez » décrit ses propres champs :
 * libellés et exemples de saisie. Un champ à null est masqué.
 * Pour ajouter un besoin, ajoutez un objet à la fin de la liste.
 */

const pcBrand: OrderField = { label: "Marque du PC", placeholder: "Dell, HP, Lenovo…" };
const pcModel: OrderField = {
  label: "Modèle du PC",
  placeholder: "Latitude 5490, Pavilion 15… (écrit sur l'étiquette sous le PC)",
};
const pcBrandModel: OrderField = {
  label: "Marque et modèle du PC",
  placeholder: "Dell Latitude 5490, HP Pavilion 15…",
};

const SECURITY_NOTICE =
  "Pour votre sécurité, n'écrivez jamais de mot de passe, de code reçu par SMS ou de numéro de carte dans ce message.";

export const orderOptions: OrderOption[] = [
  // ---- Pièces ----
  {
    id: "batterie-interne",
    label: "Batterie interne",
    kind: "piece",
    primary: pcBrand,
    secondary: pcModel,
    note: {
      label: "Précisions",
      placeholder: "Capacité ou référence de l'ancienne batterie (ex : 42 Wh), problème constaté, délai souhaité…",
    },
  },
  {
    id: "batterie-amovible",
    label: "Batterie amovible",
    kind: "piece",
    primary: pcBrand,
    secondary: pcModel,
    note: {
      label: "Précisions",
      placeholder: "Référence imprimée sur l'ancienne batterie, nombre de cellules (6 ou 9), délai souhaité…",
    },
  },
  {
    id: "clavier-interne",
    label: "Clavier interne",
    kind: "piece",
    primary: pcBrand,
    secondary: pcModel,
    note: {
      label: "Précisions",
      placeholder: "Disposition AZERTY ou QWERTY, avec ou sans rétroéclairage, délai souhaité…",
    },
  },
  {
    id: "clavier-externe",
    label: "Clavier externe",
    kind: "piece",
    primary: { label: "Marque souhaitée", placeholder: "Logitech, HP, Dell… ou sans préférence" },
    secondary: { label: "Type de clavier", placeholder: "Filaire ou sans fil, AZERTY ou QWERTY…" },
    note: { label: "Précisions", placeholder: "Usage (bureau, jeu), budget, quantité, délai souhaité…" },
  },
  {
    id: "rack-30",
    label: "Rack 3.0 (USB 3.0)",
    kind: "piece",
    primary: { label: "Disque à installer", placeholder: "HDD ou SSD 2.5″, capacité (ex : 500 Go)" },
    secondary: null,
    note: { label: "Précisions", placeholder: "Quantité, délai souhaité…" },
  },
  {
    id: "rack-31",
    label: "Rack 3.1 (USB Type-C)",
    kind: "piece",
    primary: { label: "Disque à installer", placeholder: "HDD ou SSD 2.5″, capacité (ex : 500 Go)" },
    secondary: null,
    note: { label: "Précisions", placeholder: "Quantité, port USB Type-C sur votre PC, délai souhaité…" },
  },
  {
    id: "disque-hdd",
    label: "Disque dur HDD",
    kind: "piece",
    primary: { label: "Capacité souhaitée", placeholder: "500 Go, 1 To, 2 To…" },
    secondary: { label: "Pour quel appareil ?", placeholder: "Portable Dell Latitude 5490, PC de bureau…" },
    note: {
      label: "Précisions",
      placeholder: "Format 2.5″ (portable) ou 3.5″ (PC de bureau), remplacement d'un disque lent, délai souhaité…",
    },
  },
  {
    id: "disque-ssd",
    label: "Disque SSD",
    kind: "piece",
    primary: { label: "Capacité souhaitée", placeholder: "256 Go, 512 Go, 1 To…" },
    secondary: { label: "Pour quel appareil ?", placeholder: "Portable HP Pavilion 15, PC de bureau…" },
    note: {
      label: "Précisions",
      placeholder: "SATA 2.5″ ou M.2, remplacement ou ajout, installation souhaitée, délai…",
    },
  },
  {
    id: "disque-nvme",
    label: "Disque NVMe",
    kind: "piece",
    primary: { label: "Capacité souhaitée", placeholder: "256 Go, 512 Go, 1 To…" },
    secondary: {
      label: "Modèle du PC (pour vérifier la compatibilité)",
      placeholder: "Dell Latitude 5490, Lenovo ThinkPad T480…",
    },
    note: {
      label: "Précisions",
      placeholder: "Port M.2 de votre PC si vous le connaissez (NVMe ou SATA), installation souhaitée, délai…",
    },
  },

  // ---- Services ----
  {
    id: "install-os",
    label: "Installation du système d'exploitation",
    kind: "service",
    primary: { label: "Système souhaité", placeholder: "Windows 10, Windows 11, Ubuntu…" },
    secondary: pcBrandModel,
    note: {
      label: "Précisions",
      placeholder: "Sauvegarde de vos fichiers nécessaire ?, problème actuel du PC, délai souhaité…",
    },
  },
  {
    id: "install-logiciels",
    label: "Installation de logiciels ou pilotes",
    kind: "service",
    primary: { label: "Logiciels ou pilotes voulus", placeholder: "Office, Chrome, pilote Wi-Fi, pilote imprimante…" },
    secondary: pcBrandModel,
    note: {
      label: "Précisions",
      placeholder: "Système actuel (Windows 10, 11…), ce qui ne fonctionne pas, délai souhaité…",
    },
  },
  {
    id: "activation-windows",
    label: "Activation Windows ou Office",
    kind: "service",
    primary: { label: "Ce qu'il faut activer", placeholder: "Windows 11, Office 2021…" },
    secondary: null,
    note: {
      label: "Précisions",
      placeholder: "Version actuelle, message d'erreur affiché, délai souhaité…",
    },
    notice: SECURITY_NOTICE,
  },
  {
    id: "import-chine",
    label: "Importation via la Chine",
    kind: "service",
    primary: { label: "Produit à importer", placeholder: "Nom exact du produit ou lien de sa fiche" },
    secondary: { label: "Quantité", placeholder: "1, 5, 20…" },
    note: {
      label: "Précisions",
      placeholder: "Couleur, taille, budget maximum, délai souhaité…",
    },
  },
  {
    id: "redotpay",
    label: "Dépôt ou transfert RedotPay",
    kind: "service",
    primary: { label: "Opération", placeholder: "Dépôt ou transfert" },
    secondary: { label: "Montant", placeholder: "Montant et devise (ex : 50 USD)" },
    note: { label: "Précisions", placeholder: "Délai souhaité, autres précisions…" },
    notice: SECURITY_NOTICE,
  },
  {
    id: "abonnement-ia",
    label: "Abonnement à un outil d'IA",
    kind: "service",
    primary: { label: "Outil souhaité", placeholder: "ChatGPT, Gemini, Midjourney, Grok, Copilot…" },
    secondary: { label: "Formule", placeholder: "Mensuelle ou annuelle, gratuite ou payante…" },
    note: {
      label: "Précisions",
      placeholder: "Compte existant ou à créer, votre usage (études, travail, images…)…",
    },
    notice: SECURITY_NOTICE,
  },
  {
    id: "starlink",
    label: "Activation Starlink",
    kind: "service",
    primary: { label: "Votre besoin", placeholder: "Activation du compte, installation, configuration…" },
    secondary: null,
    note: {
      label: "Précisions",
      placeholder: "Kit déjà en votre possession ou non, abonnement souhaité, délai souhaité…",
    },
    notice: SECURITY_NOTICE,
  },
  {
    id: "boost-facebook",
    label: "Boost de page Facebook",
    kind: "service",
    primary: { label: "Page à booster", placeholder: "Nom ou lien de votre page Facebook" },
    secondary: { label: "Budget prévu", placeholder: "Montant (ex : 20 000 Ar)" },
    note: {
      label: "Précisions",
      placeholder: "Objectif (plus de messages, plus de J'aime…), public visé, durée souhaitée…",
    },
    notice: SECURITY_NOTICE,
  },
  {
    id: "autre",
    label: "Autre demande",
    kind: "service",
    primary: null,
    secondary: null,
    note: { label: "Votre demande", placeholder: "Décrivez ce dont vous avez besoin : pièce, service, modèle de PC…" },
  },
];

export const defaultOptionId = orderOptions[0].id;

export function getOption(id: string): OrderOption {
  return orderOptions.find((o) => o.id === id) ?? orderOptions[0];
}
