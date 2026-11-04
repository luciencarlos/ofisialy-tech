import type { ReactNode } from "react";

export type ButtonVariant = "sun" | "ghost" | "solid" | "line";

const base =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-transparent px-5 text-base font-bold no-underline transition sm:w-auto cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  sun: "bg-sun text-sun-ink hover:brightness-95",
  ghost: "border-white/35 text-on-navy hover:bg-white/10",
  solid: "bg-brand text-brand-ink hover:brightness-110",
  line: "border-line text-ink hover:border-brand",
};

export function buttonClass(variant: ButtonVariant, extra = ""): string {
  return `${base} ${variants[variant]} ${extra}`;
}

type Props = {
  variant: ButtonVariant;
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Button({ variant, children, href, external, onClick, className = "" }: Props) {
  const cls = buttonClass(variant, className);
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
