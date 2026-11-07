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
