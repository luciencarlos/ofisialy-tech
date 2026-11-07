import Image from "next/image";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import type { Product, SpecAvailability } from "@/data/types";
import { Container } from "./ui/Container";
import { SectionHead } from "./ui/SectionHead";
import { PickButton } from "./ui/PickButton";

const availabilityLabel: Record<SpecAvailability, string> = {
  "en-stock": "En stock",
  "sur-commande": "Sur commande",
  epuise: "Épuisé",
};

const availabilityStyle: Record<SpecAvailability, string> = {
  "en-stock": "border-ok text-ok",
  "sur-commande": "border-line text-muted",
  epuise: "border-transparent bg-line text-muted",
};

function SpecGrid({ specs, cols }: { specs: NonNullable<Product["specs"]>; cols: string }) {
  return (
    <div className={`grid gap-3 ${cols}`}>
      {specs.map((s) => (
        <div key={s.label} className="grid min-w-0 content-start gap-0.5 rounded-[10px] border border-line px-3.5 py-3">
          <span className="font-mono text-xs uppercase tracking-[.08em] text-brand">{s.label}</span>
          <b className="font-display text-xl">{s.title}</b>
          <span className="text-sm text-muted">{s.detail}</span>
          {s.availability ? (
            <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[12px] font-bold ${availabilityStyle[s.availability]}`}
              >
                {availabilityLabel[s.availability]}
              </span>
              {s.availabilityNote ? <span className="text-sm text-muted">{s.availabilityNote}</span> : null}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Tags({ items, highlight }: { items: string[]; highlight?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className={`rounded-md border px-2.5 py-1 font-mono text-[12.5px] font-medium ${
            highlight ? "border-transparent bg-sun text-sun-ink" : "border-line"
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProductCard({ p }: { p: Product }) {
  const wrapper =
    "reveal group grid min-w-0 overflow-hidden rounded-2xl border border-line bg-surface " +
    (p.layout === "feature" ? "md:col-span-2 md:grid-cols-[1.1fr_1fr]" : "") +
    (p.layout === "row" ? "md:col-span-2" : "");

  const photo = p.image ? (
    <div className="relative min-h-[180px] overflow-hidden bg-[#e6edf9] md:min-h-[220px]">
      <Image
        src={p.image.src}
        alt={p.image.alt}
        width={p.image.width}
        height={p.image.height}
        sizes="(min-width: 768px) 560px, 100vw"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  ) : null;

  if (p.layout === "row") {
    return (
      <article className={wrapper}>
        <div className="grid items-center gap-7 p-5 sm:p-6 md:grid-cols-[1fr_1.3fr]">
          <div className="grid justify-items-start gap-3.5">
            <h3 className="text-[26px] font-bold">{p.title}</h3>
            <p className="text-muted">{p.description}</p>
            <PickButton optionId={p.cta.optionId} variant={p.cta.variant}>{p.cta.label}</PickButton>
          </div>
          {p.specs ? <SpecGrid specs={p.specs} cols="sm:grid-cols-3" /> : null}
        </div>
      </article>
    );
  }

  return (
    <article className={wrapper}>
      {photo}
      <div className="grid min-w-0 content-start justify-items-start gap-3.5 p-5 sm:p-[26px]">
        <h3 className="text-[26px] font-bold">{p.title}</h3>
        <p className="text-muted">{p.description}</p>
        {p.tags ? <Tags {...p.tags} /> : null}
        {p.extra ? <p className="text-muted">{p.extra}</p> : null}
        {p.specs ? (
          <div className="w-full">
            <SpecGrid specs={p.specs} cols="sm:grid-cols-2" />
          </div>
        ) : null}
        <PickButton optionId={p.cta.optionId} variant={p.cta.variant}>{p.cta.label}</PickButton>
      </div>
    </article>
  );
}

export function Catalogue() {
  return (
    <section id="produits" className="py-14 md:py-[72px]">
      <Container>
        <SectionHead
          eyebrow="Accessoires informatiques"
          title="Les pièces que nous commandons pour vous"
          text="Tout se fait sur commande. Vous nous donnez la marque et le modèle, nous trouvons la référence compatible."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div aria-label="Marques compatibles" className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <span className="mr-1.5 font-mono text-xs uppercase tracking-[.08em] text-muted">Compatible avec</span>
          {brands.map((b) => (
            <span key={b} className="rounded-full border border-line bg-surface px-3 py-1 font-display text-[17px] font-bold">
              {b}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
