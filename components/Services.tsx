import { serviceGroups } from "@/data/services";
import { Container } from "./ui/Container";
import { SectionHead } from "./ui/SectionHead";

export function Services() {
  return (
    <section id="services" className="py-14 md:py-[72px]">
      <Container>
        <SectionHead
          eyebrow="Mes services"
          title="Des solutions rapides et fiables pour vos besoins numériques"
          text="Votre satisfaction est la priorité, avant et après le service."
        />
        <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          {serviceGroups.map((g) => (
            <div key={g.label}>
              <span className="mb-1.5 block font-mono text-xs uppercase tracking-[.08em] text-brand">{g.label}</span>
              {g.items.map((s) => (
                <div key={s.title} className="reveal grid gap-1.5 border-t border-line py-4">
                  <h4 className="text-xl font-bold">{s.title}</h4>
                  <p className="text-[15.5px] text-muted">{s.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
