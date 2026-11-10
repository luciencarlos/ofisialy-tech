import { Container } from "./ui/Container";

const poles = [
  {
    href: "#produits",
    title: "Accessoires pour portables",
    text: "Pièces compatibles avec votre modèle, commandées pour vous.",
    chips: ["Batteries", "Claviers", "Racks 3.0 / 3.1", "HDD · SSD · NVMe"],
    cta: "Voir les accessoires",
  },
  {
    href: "#services",
    title: "Services informatiques",
    text: "Installation, activation et services en ligne, faits rapidement.",
    chips: ["Système", "Logiciels", "Pilotes", "Windows et Office"],
    cta: "Voir les services",
  },
];

/** Les deux univers du site, comme sur la maquette : deux grandes cartes à toucher. */
export function Poles() {
  return (
    <section aria-label="Nos deux univers" className="bg-bg py-10 md:py-14">
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {poles.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="group grid gap-3 rounded-3xl card-circuit border border-cyan/25 p-5 no-underline transition hover:border-cyan/60 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,.45)] sm:p-6"
            >
              <h2 className="text-xl font-extrabold tracking-[-.01em]">{p.title}</h2>
              <p className="text-muted md:min-h-[3.25rem]">{p.text}</p>
              <ul className="flex flex-wrap gap-2">
                {p.chips.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-bg/80 px-3 py-1 text-xs font-bold text-muted">
                    {c}
                  </li>
                ))}
              </ul>
              <span className="inline-flex min-h-12 items-center font-bold text-cyan underline-offset-4 group-hover:underline">
                {p.cta} →
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
