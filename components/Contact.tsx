import { siteConfig } from "@/config/site";
import { messengerUrl } from "@/lib/order";
import { Section } from "./ui/Section";
import { SectionHead } from "./ui/SectionHead";
import { Button } from "./ui/Button";
import { MessengerIcon } from "./ui/Icons";

export function Contact() {
  const { phoneDisplay, facebook } = siteConfig.contact;
  const tel = phoneDisplay.replace(/[^\d+]/g, "");
  const messenger = messengerUrl();
  return (
    <Section id="contact">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <SectionHead
          eyebrow="Contact"
          title="Parlons de votre ordinateur"
          text="Une question sur une pièce, un service ou un délai ? Écrivez-nous, nous répondons avant et après chaque service."
        />
        <div className="grid gap-3.5 card-circuit rounded-3xl border border-cyan/25 p-5 sm:p-6">
          <h3 className="card-title">{siteConfig.name}</h3>
          <p>
            Retrouvez-nous sur la page Facebook <b>{siteConfig.name}</b>.
          </p>
          {phoneDisplay ? (
            <a
              href={tel ? `tel:${tel}` : undefined}
              className="inline-flex min-h-12 items-center break-words text-xl font-extrabold text-brand no-underline hover:underline"
            >
              {phoneDisplay}
            </a>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {messenger ? (
              <Button variant="messenger" href={messenger} external>
                <MessengerIcon className="size-5" />
                Écrire sur Messenger
              </Button>
            ) : facebook ? (
              <Button variant="solid" href={facebook} external>Visiter la page Facebook</Button>
            ) : null}
            <Button variant="line" href="#commande">Préparer une demande</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
