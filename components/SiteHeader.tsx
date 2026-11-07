"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navCta, navLinks } from "@/data/nav";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

/**
 * En-tête fixe : logo, navigation (menu sur téléphone), bouton « Commander » toujours à portée,
 * et soulignement de la section affichée.
 */
export function SiteHeader({ showStock = false }: { showStock?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const links = navLinks.filter((l) => showStock || !l.stockOnly);

  useEffect(() => {
    const ids = [...links.map((l) => l.href.slice(1)), navCta.href.slice(1)];
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting) setActive(id);
          else setActive((a) => (a === id ? "" : a));
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStock]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkBase = "rounded-full px-3.5 text-base font-medium no-underline transition";

  return (
    <header className="on-navy sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-on-navy backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-3">
        <a href="#" aria-label="Ofisialy Tech, retour en haut de la page" className="inline-flex min-h-11 flex-none items-center rounded-lg">
          <Image
            src="/images/logo.webp"
            alt="Ofisialy Tech"
            width={520}
            height={122}
            priority
            className="h-9 w-auto rounded-lg sm:h-10"
          />
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href.slice(1) ? "location" : undefined}
              className={`${linkBase} inline-flex min-h-11 items-center ${
                active === l.href.slice(1) ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="sun" size="sm" href={navCta.href} fit>
            {navCta.label}
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border-2 border-white/35 text-base sm:w-auto sm:px-3.5 font-bold text-on-navy hover:bg-white/10 md:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
            <span className="sr-only sm:not-sr-only">Menu</span>
          </button>
        </div>
      </Container>

      {open ? (
        <nav id="menu-mobile" aria-label="Menu" className="border-t border-white/10 md:hidden">
          <Container className="grid py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href.slice(1) ? "location" : undefined}
                className={`flex min-h-12 items-center rounded-[10px] px-3 text-lg font-medium no-underline ${
                  active === l.href.slice(1) ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {l.label}
              </a>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
