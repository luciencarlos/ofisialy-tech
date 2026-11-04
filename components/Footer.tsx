import { siteConfig } from "@/config/site";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy-muted">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-7 text-sm">
        <b className="font-display text-lg text-on-navy">{siteConfig.name}</b>
        <span>{siteConfig.tagline}</span>
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
      </Container>
    </footer>
  );
}
