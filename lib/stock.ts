import fs from "node:fs";
import path from "node:path";
import { stockCategories, type StockCategoryId } from "@/data/stock-categories";

export type Availability = "en-stock" | "sur-commande" | "epuise";

export type StockItem = {
  id: string;
  title: string;
  category: StockCategoryId;
  availability: Availability;
  /** Chemin public de la photo optimisée, ou null si absente. */
  photo: string | null;
  price: number | null;
  compatible: string;
  description: string;
  date: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "accessoires");
const STOCK_DIR = path.join(process.cwd(), "public", "stock");

const categoryIds = new Set<string>(stockCategories.map((c) => c.id));
const availabilities = new Set<string>(["en-stock", "sur-commande", "epuise"]);

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function photoPath(value: unknown): string | null {
  const file = str(value);
  if (!file) return null;
  const name = path.basename(file, path.extname(file)) + ".webp";
  return fs.existsSync(path.join(STOCK_DIR, name)) ? `/stock/${name}` : null;
}

/** Lit les articles saisis dans /admin (content/accessoires/*.json) au moment du build. */
export function getStock(): StockItem[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const items: StockItem[] = [];
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as Record<string, unknown>;
      const title = str(raw.title);
      if (!title || raw.published === false) continue;

      const price = typeof raw.price === "number" && raw.price > 0 ? raw.price : null;
      items.push({
        id: path.basename(file, ".json"),
        title,
        category: categoryIds.has(str(raw.category)) ? (str(raw.category) as StockCategoryId) : "autre",
        availability: availabilities.has(str(raw.availability)) ? (str(raw.availability) as Availability) : "en-stock",
        photo: photoPath(raw.photo),
        price,
        compatible: str(raw.compatible),
        description: str(raw.description),
        date: str(raw.date),
      });
    } catch (err) {
      console.warn(`Article ignoré (${file}) :`, err instanceof Error ? err.message : err);
    }
  }

  return items.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}
