import { siteConfig } from "@/config/site";
import { navCta, navLinks } from "@/data/nav";
import { Container } from "./ui/Container";
import { SocialLinks } from "./SocialLinks";

export function Footer({ showStock = false }: { showStock?: boolean }) {
  const links = [...navLinks.filter((l) => showStock || !l.stockOnly), navCta];
  return (
    <footer className="circuit on-navy border-t border-cyan/20 text-on-navy-muted [--scrim:linear-gradient(rgba(10,17,40,.75),rgba(10,17,40,.75))]">
      <Container className="grid gap-7 pb-28 pt-10 text-sm md:pb-10">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-7">
          <div className="grid max-w-[44ch] gap-1.5">
            <b className="font-display text-lg text-on-navy">{siteConfig.name}</b>
            <span className="text-base">{siteConfig.tagline}</span>
          </div>
          <nav aria-label="Pied de page" className="grid gap-1">
            <span className="text-xs font-bold uppercase tracking-[.06em]">Navigation</span>
            <ul className="flex max-w-[22rem] flex-wrap gap-x-5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center text-base text-on-navy no-underline hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks />
        </div>
        <div className="border-t border-white/10 pt-5">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
      </Container>
    </footer>
  );
}
