# Naï Beauty Store

> Une boutique en ligne elegante et responsive pour decouvrir les produits Naï Beauty et commander simplement via WhatsApp.

![Apercu produit Naï Beauty](./public/Screenshot%202026-09-04%20095351.png)

## Fonctionnalites

- Accueil et presentation de la boutique
- Catalogue de produits et pages detaillees
- Panier avec gestion des quantites
- Pages legales et politique de confidentialite
- Espace d'administration pour gerer le contenu du site
- Interface responsive pour mobile et desktop

## Ce que propose le projet

- Une page d'accueil orientee marque
- Un catalogue avec filtres et fiches produit
- Un panier avec calcul des quantites et du total
- Une commande rapide via WhatsApp
- Un espace d'administration pour modifier le contenu du site
- Un affichage adapte aux mobiles, tablettes et ordinateurs

## Stack technique

`React` · `Vite` · `React Router` · `Lucide React` · `Oxlint`
## Installation

Prerequis : Node.js et npm.

```bash
npm install
```

## Developpement

```bash
npm run dev
```

Le site sera accessible a l'adresse affichee par Vite, generalement `http://localhost:5173`.

## Verification et build

```bash
npm run lint
npm run build
```

Le build de production est genere dans le dossier `dist/`.

## Deploiement sur Vercel

Le projet peut etre deploye directement depuis GitHub :

1. Importer le depot `MardoStudent/nai-beauty-store` dans Vercel.
2. Utiliser la commande de build `npm run build`.
3. Utiliser `dist` comme dossier de sortie.
4. Lancer le deploiement.

Vercel attribuera automatiquement une adresse en `vercel.app`, meme sans domaine personnalise.
