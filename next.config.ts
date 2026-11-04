import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site statique : `npm run build` produit le dossier `out/`, hébergeable partout.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
