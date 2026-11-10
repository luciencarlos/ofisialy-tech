import { Section } from "./ui/Section";
import { SectionHead } from "./ui/SectionHead";
import { OrderForm } from "./OrderForm";

const steps = [
  { title: "Décrivez la pièce ou le service", text: "Marque et modèle du PC, type de pièce, photo de l'étiquette si possible." },
  { title: "Nous confirmons la compatibilité", text: "Nous vérifions la référence et vous indiquons le prix et le délai." },
  { title: "Vous validez, nous commandons", text: "La pièce est commandée pour vous, puis installée si vous le souhaitez." },
];

export function OrderSection() {
  return (
    <Section id="commande" tone="navy">
        <SectionHead
          eyebrow="Passer commande"
          title="Préparez votre demande en 30 secondes"
          text="Remplissez les champs, puis envoyez votre demande sur Messenger ou WhatsApp. Nous répondons avec la disponibilité et le prix."
        />
        <div className="grid items-start gap-10 md:grid-cols-[.8fr_1.2fr]">
          <ol className="grid gap-[22px]">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[44px_1fr] gap-3.5">
                <span className="grid size-11 place-items-center rounded-full bg-cobalt font-display text-xl font-extrabold text-white">
                  {i + 1}
                </span>
                <div>
                  <b className="card-title block">{s.title}</b>
                  <span className="text-muted">{s.text}</span>
                </div>
              </li>
            ))}
          </ol>
          <OrderForm />
        </div>
    </Section>
  );
}
