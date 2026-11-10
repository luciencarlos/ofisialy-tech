"use client";

import Image from "next/image";
import { navCta, navLinks } from "@/data/nav";
import { useActiveSection } from "@/lib/useActiveSection";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

/**
 * En-tête fixe sur fond « circuit » : logo, navigation (ordinateur) et bouton « Commander ».
 * Sur téléphone, la navigation passe par la barre d'onglets du bas (BottomNav).
 */
export function SiteHeader({ showStock = false }: { showStock?: boolean }) {
  const links = navLinks.filter((l) => showStock || !l.stockOnly);
  const active = useActiveSection([...links.map((l) => l.href.slice(1)), navCta.href.slice(1)]);

  return (
    <header
      className="circuit on-navy sticky top-0 z-40 border-b border-cyan/20 text-on-navy shadow-md [--scrim:linear-gradient(rgba(10,17,40,.72),rgba(10,17,40,.72))]"
    >
      <Container className="flex min-h-14 items-center justify-between gap-3">
        <a href="#accueil" aria-label="Ofisialy Tech, retour en haut de la page" className="inline-flex min-h-12 flex-none items-center rounded-xl">
          <Image
            src="/images/logo.webp"
            alt="Ofisialy Tech"
            width={520}
            height={122}
            priority
            className="h-7 w-auto rounded-md sm:h-8"
          />
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href.slice(1) ? "location" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-base font-semibold no-underline transition ${
                active === l.href.slice(1) ? "bg-surface-hi text-cyan" : "hover:bg-white/10"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Button variant="sun" size="sm" href={navCta.href} fit className="!min-h-11 !px-4">
            {navCta.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
