/** Liens de navigation de l'en-tête et du pied de page. `stockOnly` : affiché seulement si des articles sont publiés. */
export type NavLink = { href: string; label: string; stockOnly?: boolean };

export const navLinks: NavLink[] = [
  { href: "#disponibles", label: "Disponibles", stockOnly: true },
  { href: "#produits", label: "Produits", },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

/** Bouton d'action toujours visible dans l'en-tête. */
export const navCta = { href: "#commande", label: "Commander" };

/** Onglets de la barre fixe en bas (téléphone). `tel` : remplacé par « Appeler » si un numéro est renseigné. */
export const tabLinks = [
  { href: "#accueil", label: "Accueil", icon: "home" },
  { href: "#produits", label: "Produits", icon: "box" },
  { href: "#services", label: "Services", icon: "wrench" },
  { href: "#commande", label: "Commander", icon: "cart", primary: true },
  { href: "#contact", label: "Contact", icon: "chat" },
] as const;
