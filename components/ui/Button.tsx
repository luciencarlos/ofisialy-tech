import type { ReactNode } from "react";

export type ButtonVariant = "sun" | "ghost" | "solid" | "line" | "messenger" | "whatsapp";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border-2 border-transparent font-bold no-underline transition sm:w-auto cursor-pointer";

const sizes: Record<ButtonSize, string> = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-4 text-[17px]",
};

const variants: Record<ButtonVariant, string> = {
  sun: "bg-sun text-sun-ink hover:brightness-95",
  ghost: "border-white/35 text-on-navy hover:bg-white/10",
  solid: "bg-brand text-brand-ink hover:brightness-110",
  line: "border-line text-ink hover:border-brand",
  // Couleurs des marques : le texte est choisi pour rester lisible sur chaque fond.
  messenger: "bg-[#0866ff] text-white hover:brightness-110",
  whatsapp: "bg-[#25d366] text-[#04210f] hover:brightness-95",
};

export function buttonClass(variant: ButtonVariant, extra = "", size: ButtonSize = "md"): string {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

type Props = {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Aspect grisé et lecteurs d'écran informés, mais le clic reste reçu (pour afficher une explication). */
  ariaDisabled?: boolean;
  className?: string;
};

export function Button({ variant, size = "md", children, href, external, onClick, ariaDisabled, className = "" }: Props) {
  const cls = buttonClass(variant, `${ariaDisabled ? "opacity-60" : ""} ${className}`, size);
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
