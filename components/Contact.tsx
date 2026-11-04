import { siteConfig } from "@/config/site";
import { Container } from "./ui/Container";
import { SectionHead } from "./ui/SectionHead";
import { Button } from "./ui/Button";

export function Contact() {
  const { phoneDisplay, facebook } = siteConfig.contact;
  return (
    <section id="contact" className="py-14 md:py-[72px]">
      <Container className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Contact"
            title="Parlons de votre ordinateur"
            text="Une question sur une pièce, un service ou un délai ? Écrivez-nous, nous répondons avant et après chaque service."
          />
        </div>
        <div className="grid gap-3 rounded-2xl border border-line bg-surface p-6">
          <h3 className="text-[22px] font-bold">{siteConfig.name}</h3>
          <p>
            Retrouvez-nous sur la page Facebook <b>{siteConfig.name}</b>.
          </p>
          {phoneDisplay ? <div className="break-words font-mono text-xl font-bold">{phoneDisplay}</div> : null}
          <div className="flex flex-wrap gap-2.5">
            {facebook ? (
              <Button variant="solid" href={facebook} external>Visiter la page Facebook</Button>
            ) : null}
            <Button variant="line" href="#commande">Préparer une demande</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
