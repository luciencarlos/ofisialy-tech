# Ofisialy Tech, site vitrine

Next.js 16, TypeScript, Tailwind CSS 4. Le site est exporté en fichiers statiques.

## Démarrer (VS Code)

```bash
npm install
npm run dev        # http://localhost:3000
```

Extensions VS Code conseillées : **Tailwind CSS IntelliSense**, **ESLint**.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Téléphone, WhatsApp, Messenger, Facebook | `config/site.ts` |
| **Photos et articles disponibles** | page `/admin` (voir `GUIDE-ADMIN.md`), pas de code |
| Produits (cartes du catalogue) | `data/products.ts` |
| Services | `data/services.ts` |
| Choix du menu de commande | `data/order-options.ts` |
| Conseils « où trouver la référence » | `data/reference-tips.ts` |
| Marques compatibles | `data/brands.ts` |
| Couleurs, mode sombre, animations | `app/globals.css` |
| Message généré pour la commande | `lib/order.ts` |
| Mise en page d'une section | `components/` |
| Logo et visuels du catalogue | `public/images/` |
| Articles saisis dans /admin | `content/accessoires/` et `content/uploads/` (générés par l'admin) |
| Champs de l'admin | `public/admin/config.yml` |

Ajouter un produit : ajoutez un objet dans `data/products.ts` et, si besoin, une ligne dans `data/order-options.ts`.

## Administration des photos

Le site lit les articles de `content/accessoires/` au moment du build. Pour les ajouter sans coder, suivez **`GUIDE-ADMIN.md`** (GitHub + Netlify + Decap CMS).

## Mettre en ligne

```bash
npm run build      # crée le dossier out/
```

- **Netlify depuis GitHub** (nécessaire pour `/admin`) : build `npm run build`, publication `out`.
- **Netlify Drop** : glissez le dossier `out/` sur app.netlify.com/drop (sans administration des photos).
- **Vercel** : le site fonctionne, mais la connexion GitHub de `/admin` y demande un serveur d'authentification en plus. Gardez Netlify si vous voulez gérer les photos.
- **Render** : Static Site, commande `npm run build`, dossier de publication `out`.

## Notes

- Les polices (Bricolage Grotesque, DM Sans, JetBrains Mono) sont téléchargées depuis Google Fonts pendant `npm run dev` et `npm run build` : une connexion Internet est nécessaire.
- L'apparition des blocs au défilement est en CSS pur (`animation-timeline: view()`). Les navigateurs qui ne la gèrent pas affichent simplement le contenu, et `prefers-reduced-motion` la désactive.
