import type { StockItem } from "@/lib/stock";
import { Section } from "./ui/Section";
import { SectionHead } from "./ui/SectionHead";
import { StockGrid } from "./StockGrid";

export function StockSection({ items }: { items: StockItem[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="disponibles" tone="surface">
      <SectionHead
        eyebrow="Photos réelles"
        title="Disponibles maintenant"
        text="Les accessoires que nous avons en main ou que nous pouvons commander. Choisissez un article, nous confirmons le prix et le délai."
      />
      <StockGrid items={items} />
    </Section>
  );
}
