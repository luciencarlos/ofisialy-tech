import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { BatteryCharge } from "./ui/BatteryCharge";

const promises = ["Pièces de qualité et garanties", "Compatibilité assurée", "Conseils selon votre modèle"];

const example = [
  ["Pièce", "Batterie interne"],
  ["Marque", "Dell"],
  ["Capacité", "42 Wh"],
  ["Disponibilité", "Sur commande"],
];

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="titre-accueil" className="circuit on-navy text-on-navy [--scrim:linear-gradient(90deg,rgba(10,17,40,.92)_0%,rgba(10,17,40,.88)_62%,rgba(10,17,40,.3)_100%)]">
      <Container className="py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_.75fr]">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface-hi/80 px-3 py-1 text-xs font-bold uppercase tracking-[.06em] text-cyan">
              <span aria-hidden="true" className="size-2 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,210,255,.6)]" />
              Accessoires et services informatiques
            </span>
            <h1 id="titre-accueil" className="text-[clamp(30px,5.2vw,56px)] font-extrabold tracking-[-.02em]">
              Batteries, claviers, disques et <em className="not-italic text-sun">dépannage</em> pour votre ordinateur.
            </h1>
            <p className="mt-[18px] max-w-[56ch] text-lg text-on-navy">
              Des pièces pour portables de toutes marques, commandées pour vous, et des services d&apos;installation
              faits rapidement : système, logiciels, pilotes et activation.
            </p>
            <div className="mt-[26px] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="sun" href="#commande">Demander une pièce</Button>
              <Button variant="ghost" href="#services">Voir les services</Button>
            </div>
            <ul aria-label="Nos engagements" className="mt-5 flex flex-wrap gap-x-[22px] gap-y-2.5">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-2 text-base">
                  <span aria-hidden className="size-2 flex-none rounded-full bg-sun" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Exemple de demande" className="grid gap-3.5 rounded-3xl border border-line bg-surface/90 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[.06em] text-cyan">Exemple de demande</span>
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
            <p className="text-sm text-on-navy-muted">
              Envoyez la marque et le modèle de votre PC. Nous cherchons la pièce compatible.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
