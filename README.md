 # NAI Beauty Store

# Site e-commerce de produits de beaute construit avec React et Vite.

## Fonctionnalites

- Accueil et presentation de la boutique
- Catalogue de produits et pages detaillees
- Panier avec gestion des quantites
- Pages legales et politique de confidentialite
- Espace d'administration pour gerer le contenu du site
- Interface responsive pour mobile et desktop

## Technologies


## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
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
