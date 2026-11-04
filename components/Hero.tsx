import Image from "next/image";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { BatteryCharge } from "./ui/BatteryCharge";

const nav = [
  { href: "#disponibles", label: "Disponibles", stockOnly: true },
  { href: "#produits", label: "Produits" },
  { href: "#services", label: "Services" },
  { href: "#commande", label: "Commander" },
  { href: "#contact", label: "Contact" },
];

const promises = ["Pièces de qualité et garanties", "Compatibilité assurée", "Conseils selon votre modèle"];

const example = [
  ["Pièce", "Batterie interne"],
  ["Marque", "Dell"],
  ["Capacité", "42 Wh"],
  ["Disponibilité", "Sur commande"],
];

export function Hero({ showStock = false }: { showStock?: boolean }) {
  return (
    <header className="bg-navy bg-[radial-gradient(900px_420px_at_85%_10%,#123a8a_0%,transparent_60%)] text-on-navy">
      <Container className="grid gap-9 pb-14 pt-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Image
            src="/images/logo.webp"
            alt="Ofisialy tech, votre partenaire en solutions technologiques"
            width={520}
            height={122}
            priority
            className="h-auto w-[min(300px,70vw)] rounded-xl"
          />
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-1.5">
            {nav.filter((l) => showStock || !("stockOnly" in l)).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-[15px] font-medium text-on-navy no-underline hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_.75fr]">
          <div>
            <h1 className="text-[clamp(34px,5.4vw,62px)] font-extrabold tracking-[-.02em]">
              Batteries, claviers, disques et <em className="not-italic text-sun">dépannage</em> pour votre ordinateur.
            </h1>
            <p className="mt-[18px] max-w-[56ch] text-lg text-on-navy-muted">
              Des pièces pour portables de toutes marques, commandées pour vous, et des services d&apos;installation
              faits rapidement : système, logiciels, pilotes et activation.
            </p>
            <div className="mt-[26px] flex flex-wrap gap-3">
              <Button variant="sun" href="#commande">Demander une pièce</Button>
              <Button variant="ghost" href="#services">Voir les services</Button>
            </div>
            <ul aria-label="Nos engagements" className="mt-5 flex flex-wrap gap-x-[22px] gap-y-2.5">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[15px]">
                  <span aria-hidden className="size-2 flex-none rounded-full bg-sun" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Exemple de demande" className="grid gap-3.5 rounded-2xl border border-white/20 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[.08em] text-cyan">Exemple de demande</span>
              <BatteryCharge className="h-6 w-12 text-on-navy" />
            </div>
            <dl className="grid gap-2.5">
              {example.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-dashed border-white/20 pb-2.5">
                  <dt className="text-sm text-on-navy-muted">{k}</dt>
                  <dd className="text-right font-mono text-sm font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[13px] text-on-navy-muted">
              Envoyez la marque et le modèle de votre PC. Nous cherchons la pièce compatible.
            </p>
          </aside>
        </div>
      </Container>
    </header>
  );
}
