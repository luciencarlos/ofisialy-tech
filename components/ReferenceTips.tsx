import { referenceTips } from "@/data/reference-tips";
import { Section } from "./ui/Section";
import { SectionHead } from "./ui/SectionHead";

export function ReferenceTips() {
  return (
    <Section id="modele" tone="surface">
      <SectionHead
        eyebrow="Avant de commander"
        title="Où trouver la référence de votre pièce"
        text="Plus l'information est précise, plus la pièce reçue correspond du premier coup."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {referenceTips.map((t) => (
          <div key={t.title} className="reveal grid content-start gap-2 border-t-[3px] border-brand pt-4">
            <h3 className="card-title">{t.title}</h3>
            <p className="text-muted">
              {t.parts.map((part, i) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <code key={i} className="rounded-[5px] border border-line bg-bg px-1.5 py-px font-mono text-sm">
                    {part.code}
                  </code>
                ),
              )}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
