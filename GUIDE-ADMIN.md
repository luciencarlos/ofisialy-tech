# Guide : ajouter vos photos d'accessoires sans toucher au code

Le site contient une page d'administration : `https://VOTRE-SITE.netlify.app/admin/`.
Vous y importez la photo, le nom, le prix et la disponibilité de chaque accessoire.
Ils apparaissent ensuite dans la section **Disponibles maintenant**, avec un bouton « Demander cet article » qui remplit le formulaire de commande.

Les articles sont enregistrés comme des fichiers dans votre dépôt GitHub. À chaque publication, Netlify reconstruit le site (1 à 2 minutes). Il n'y a ni serveur ni base de données à gérer.

---

## Partie 1 : à faire une seule fois

### 1. Mettre le projet sur GitHub

1. Créez un compte sur github.com, puis un dépôt nommé `ofisialy-tech` (privé conseillé).
2. Dans le dossier du projet :

```bash
git init
git add .
git commit -m "Site Ofisialy Tech"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/ofisialy-tech.git
git push -u origin main
```

### 2. Mettre le site en ligne sur Netlify

1. Sur app.netlify.com : **Add new site > Import an existing project > GitHub**, puis choisissez le dépôt.
2. Réglages : **Build command** `npm run build`, **Publish directory** `out`.
3. Lancez le déploiement. Netlify vous donne une adresse du type `https://nom.netlify.app`.

### 3. Indiquer votre dépôt à l'administration

Ouvrez `public/admin/config.yml` et remplacez :

- `repo: VOTRE-COMPTE-GITHUB/ofisialy-tech` par votre vrai compte et nom de dépôt
- `site_url` et `display_url` par l'adresse Netlify

Puis `git add . && git commit -m "Config admin" && git push`.

### 4. Autoriser la connexion avec GitHub

1. Sur GitHub : **Settings > Developer settings > OAuth Apps > New OAuth App**.
   - Homepage URL : l'adresse de votre site Netlify
   - Authorization callback URL : `https://api.netlify.com/auth/done`
2. Enregistrez, copiez le **Client ID**, puis cliquez sur **Generate a new client secret** et copiez-le.
3. Sur Netlify : **Site configuration > Access & security > OAuth > Install provider**, choisissez **GitHub**, collez le Client ID et le secret.

Les noms des menus peuvent légèrement changer. En cas de doute, suivez la page « GitHub backend » sur decapcms.org.

---

## Partie 2 : ajouter ou modifier un accessoire (au quotidien)

1. Ouvrez `https://VOTRE-SITE.netlify.app/admin/` et choisissez **Login with GitHub**.
2. Cliquez sur **Accessoires disponibles > New Accessoire**.
3. Remplissez :
   - **Nom de l'article** (ex : Batterie Dell Latitude 5490)
   - **Catégorie**
   - **Photo** : importez depuis votre téléphone ou ordinateur (8 Mo maximum)
   - **Disponibilité** : En stock, Sur commande ou Épuisé
   - **Prix en Ariary** (facultatif, laissez vide pour ne pas l'afficher)
   - **Marque ou modèles compatibles** et **Description** (facultatifs)
4. Cliquez sur **Publish > Publish now**.
5. Attendez 1 à 2 minutes, puis rechargez le site.

Pour modifier ou retirer un article :
- ouvrez-le dans la liste, changez ce que vous voulez, puis **Publish** ;
- décochez **Afficher sur le site** pour le masquer sans le supprimer, ou utilisez **Delete entry** pour le supprimer.

Chaque publication lance une reconstruction du site. Si vous ajoutez plusieurs articles, enregistrez-les l'un après l'autre sans attendre.

### Conseils pour de belles photos

- Un seul article par photo, sur fond clair et uni, en pleine lumière.
- Cadrez l'article en entier : le site l'affiche dans une zone 4:3 sur fond blanc, sans le rogner.
- Les photos sont réduites automatiquement (WebP, 1000 × 750). Les originaux restent dans GitHub mais ne sont pas publiés sur le site.

---

## Partie 3 : tester sur votre ordinateur

Dans deux terminaux :

```bash
npm run cms     # serveur local de l'administration
npm run dev     # le site
```

Ouvrez `http://localhost:3000/admin/` : la connexion se fait sans compte, et les articles sont écrits dans `content/accessoires` et `content/uploads`.
Pour voir une nouvelle photo sur le site local, relancez `npm run dev` (ou lancez `npm run images`, puis rechargez la page).
