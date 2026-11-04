import { Hero } from "@/components/Hero";
import { StockSection } from "@/components/StockSection";
import { getStock } from "@/lib/stock";
import { Catalogue } from "@/components/Catalogue";
import { ReferenceTips } from "@/components/ReferenceTips";
import { Services } from "@/components/Services";
import { OrderSection } from "@/components/OrderSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const stock = getStock();
  return (
    <>
      <Hero showStock={stock.length > 0} />
      <main>
        <StockSection items={stock} />
        <Catalogue />
        <ReferenceTips />
        <Services />
        <OrderSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
