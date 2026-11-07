"use client";

import Image from "next/image";
import { useState } from "react";
import { stockCategories, type StockCategoryId } from "@/data/stock-categories";
import type { Availability, StockItem } from "@/lib/stock";
import { PickButton } from "./ui/PickButton";

const availabilityLabel: Record<Availability, string> = {
  "en-stock": "En stock",
  "sur-commande": "Sur commande",
  epuise: "Épuisé",
};

const availabilityStyle: Record<Availability, string> = {
  "en-stock": "border-ok text-ok",
  "sur-commande": "border-line text-muted",
  epuise: "border-transparent bg-line text-muted",
};

const priceFormat = new Intl.NumberFormat("fr-FR");

function StockCard({ item }: { item: StockItem }) {
  const category = stockCategories.find((c) => c.id === item.category) ?? stockCategories[stockCategories.length - 1];
  const soldOut = item.availability === "epuise";

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.title}
            width={1000}
            height={750}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[.08em] text-[#4b5b78]">
            {category.label}
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-md border bg-surface px-2.5 py-1 font-mono text-xs font-bold ${availabilityStyle[item.availability]}`}
        >
          {availabilityLabel[item.availability]}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5 p-4 sm:p-5">
        <h3 className="card-title">{item.title}</h3>
        {item.compatible ? <p className="font-mono text-sm text-muted">{item.compatible}</p> : null}
        {item.description ? <p className="text-muted">{item.description}</p> : null}
        {item.price ? (
          <p className="font-display text-2xl font-extrabold">
            {priceFormat.format(item.price)} <span className="text-base font-bold text-muted">Ar</span>
          </p>
        ) : null}
        <div className="mt-auto w-full pt-1 sm:w-auto">
          <PickButton
            optionId={category.optionId}
            note={`Article : ${item.title}${soldOut ? " (indiqué épuisé)" : ""}`}
            variant={soldOut ? "line" : "solid"}
          >
            {soldOut ? "Demander la disponibilité" : "Demander cet article"}
          </PickButton>
        </div>
      </div>
    </article>
  );
}

export function StockGrid({ items }: { items: StockItem[] }) {
  const [filter, setFilter] = useState<StockCategoryId | "all">("all");
  const present = stockCategories.filter((c) => items.some((i) => i.category === c.id));
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      {present.length > 1 ? (
        <div role="group" aria-label="Filtrer par catégorie" className="mb-6 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: "Tout voir" }, ...present].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`min-h-11 cursor-pointer rounded-full border-2 px-4 text-base font-bold transition ${
                filter === c.id ? "border-brand bg-brand text-brand-ink" : "border-line text-ink hover:border-brand"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <StockCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
