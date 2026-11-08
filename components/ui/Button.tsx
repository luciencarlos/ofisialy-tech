import type { ReactNode } from "react";

export type ButtonVariant = "sun" | "ghost" | "solid" | "line" | "messenger" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[10px] border-2 font-bold no-underline transition cursor-pointer";

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-base",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-4 text-lg",
};

const variants: Record<ButtonVariant, string> = {
  sun: "border-transparent bg-sun text-sun-ink hover:brightness-95",
  ghost: "border-white/40 bg-navy/60 text-on-navy hover:bg-white/10",
  solid: "border-transparent bg-brand text-brand-ink hover:brightness-110",
  line: "border-ink/30 bg-bg/60 text-ink hover:border-brand",
  // Couleurs des marques : le texte est choisi pour rester lisible sur chaque fond.
  messenger: "border-transparent bg-[#0866ff] text-white hover:brightness-110",
  whatsapp: "border-transparent bg-[#25d366] text-[#04210f] hover:brightness-95",
};

export function buttonClass(variant: ButtonVariant, extra = "", size: ButtonSize = "md", fit = false): string {
  // Pleine largeur sur téléphone, largeur du contenu dès 640 px (sauf `fit`, toujours à la largeur du contenu).
  const width = fit ? "" : "w-full sm:w-auto";
  return `${base} ${width} ${sizes[size]} ${variants[variant]} ${extra}`;
}

type Props = {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  external?: boolean;
  /** Toujours à la largeur de son contenu (en-têtes, barres). */
  fit?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Aspect grisé et lecteurs d'écran informés, mais le clic reste reçu (pour afficher une explication). */
  ariaDisabled?: boolean;
  className?: string;
};

export function Button({ variant, size = "md", children, href, external, fit, onClick, ariaDisabled, className = "" }: Props) {
  const cls = buttonClass(variant, `${ariaDisabled ? "opacity-60" : ""} ${className}`, size, fit);
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        aria-disabled={ariaDisabled || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} aria-disabled={ariaDisabled || undefined}>
      {children}
    </button>
  );
}
