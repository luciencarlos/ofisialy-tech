import { siteConfig } from "@/config/site";
import { Container } from "./ui/Container";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy-muted">
      <Container className="grid gap-7 py-9 text-sm">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
          <div className="grid max-w-[44ch] gap-1.5">
            <b className="font-display text-lg text-on-navy">{siteConfig.name}</b>
            <span>{siteConfig.tagline}</span>
          </div>
          <SocialLinks />
        </div>
        <div className="border-t border-white/10 pt-5">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
      </Container>
    </footer>
  );
}
