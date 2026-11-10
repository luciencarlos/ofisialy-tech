import { serviceGroups } from "@/data/services";
import { Section } from "./ui/Section";
import { SectionHead } from "./ui/SectionHead";

export function Services() {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="Mes services"
        title="Des solutions rapides et fiables pour vos besoins numériques"
        text="Votre satisfaction est la priorité, avant et après le service."
      />
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {serviceGroups.map((g) => (
          <div key={g.label}>
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-[.06em] text-brand">{g.label}</span>
            {g.items.map((s) => (
              <div key={s.title} className="reveal grid gap-1.5 border-t border-line py-4">
                <h3 className="card-title">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
