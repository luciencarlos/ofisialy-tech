// Crée une version légère (WebP 1000x750) de chaque photo envoyée depuis /admin.
// Source : content/uploads  ->  Sortie : public/stock (dossier généré, non versionné).
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "content/uploads";
const OUT = "public/stock";
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tif", ".tiff"]);

async function listDir(dir) {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const sources = (await listDir(SRC)).filter((f) => EXT.has(path.extname(f).toLowerCase()));
  const expected = new Set();
  let done = 0;

  for (const file of sources) {
    const name = path.basename(file, path.extname(file)) + ".webp";
    expected.add(name);
    const from = path.join(SRC, file);
    const to = path.join(OUT, name);

    const [a, b] = await Promise.all([stat(from), stat(to).catch(() => null)]);
    if (b && b.mtimeMs >= a.mtimeMs) continue;

    try {
      await sharp(from)
        .rotate()
        .resize({ width: 1000, height: 750, fit: "contain", background: "#ffffff" })
        .webp({ quality: 80 })
        .toFile(to);
      done += 1;
    } catch (err) {
      console.warn(`Photo ignorée (${file}) : ${err.message}`);
    }
  }

  for (const file of await listDir(OUT)) {
    if (!expected.has(file) && file.endsWith(".webp")) await rm(path.join(OUT, file));
  }
  console.log(`Photos : ${sources.length} trouvée(s), ${done} optimisée(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
