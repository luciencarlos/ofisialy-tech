import type { StockItem } from "@/lib/stock";
import { Container } from "./ui/Container";
import { SectionHead } from "./ui/SectionHead";
import { StockGrid } from "./StockGrid";

export function StockSection({ items }: { items: StockItem[] }) {
  if (items.length === 0) return null;
  return (
    <section id="disponibles" className="border-b border-line bg-surface py-14 md:py-[72px]">
      <Container>
        <SectionHead
          eyebrow="Photos réelles"
          title="Disponibles maintenant"
          text="Les accessoires que nous avons en main ou que nous pouvons commander. Choisissez un article, nous confirmons le prix et le délai."
        />
        <StockGrid items={items} />
      </Container>
    </section>
  );
}
