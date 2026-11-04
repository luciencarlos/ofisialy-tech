import type { ServiceGroup } from "./types";

export const serviceGroups: ServiceGroup[] = [
  {
    label: "Maintenance informatique",
    items: [
      {
        title: "Installation du système d'exploitation",
        text: "Windows (7, 10, 11), Linux (Ubuntu et autres), autres systèmes sur demande. Un système propre et optimisé pour un meilleur rendement.",
      },
      {
        title: "Installation des logiciels de base",
        text: "Bureautique (Office), navigateurs (Chrome, Firefox), lecteurs multimédias et PDF, logiciels essentiels.",
      },
      {
        title: "Installation des pilotes",
        text: "Cartes graphiques, réseau et Wi-Fi, audio, périphériques comme l'imprimante. Tout fonctionne sans problème.",
      },
      {
        title: "Activation de Windows et d'Office",
        text: "Windows authentique et à jour, Office activé et prêt à l'emploi.",
      },
    ],
  },
  {
    label: "Autres services",
    items: [
      {
        title: "Importation via la Chine",
        text: "Achat de vos produits en Chine, suivi de la commande, importation sécurisée.",
      },
      {
        title: "Dépôt et transfert sur RedotPay",
        text: "Dépôt d'argent sur RedotPay, transfert rapide et sécurisé.",
      },
      {
        title: "Abonnement aux outils d'IA",
        text: "ChatGPT, Midjourney, Gemini, Grok, Copilot. Abonnement, configuration, conseils d'utilisation et aide à la prise en main.",
      },
      {
        title: "Activation Starlink",
        text: "Installation et configuration, activation de votre compte, conseils et assistance. Une connexion rapide, même dans les zones reculées.",
      },
      {
        title: "Boost de page Facebook",
        text: "Plus de visibilité, plus d'engagement (likes, commentaires, partages) et un ciblage précis de votre audience.",
      },
    ],
  },
];
