import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { StockSection } from "@/components/StockSection";
import { getStock } from "@/lib/stock";
import { Catalogue } from "@/components/Catalogue";
import { ReferenceTips } from "@/components/ReferenceTips";
import { Services } from "@/components/Services";
import { OrderSection } from "@/components/OrderSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Poles } from "@/components/Poles";
import { siteConfig } from "@/config/site";

export default function Home() {
  const stock = getStock();
  const showStock = stock.length > 0;
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-[10px] focus:bg-cyan focus:px-4 focus:py-3 focus:font-bold focus:text-sun-ink"
      >
        Aller au contenu
      </a>
      <SiteHeader showStock={showStock} />
      <main id="contenu">
        <Hero />
        <Poles />
        <StockSection items={stock} />
        <Catalogue />
        <ReferenceTips />
        <Services />
        <OrderSection />
        <Contact />
      </main>
      <Footer showStock={showStock} />
      <BottomNav tel={siteConfig.contact.phoneDisplay.replace(/[^\d+]/g, "")} />
    </>
  );
}
