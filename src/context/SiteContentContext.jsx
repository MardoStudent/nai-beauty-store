import React, { createContext, useState, useEffect, useCallback } from 'react';

export const SiteContentContext = createContext();

// Contenu par défaut de l'accueil (modifiable depuis l'admin)
export const defaultContent = {
  hero: {
    eyebrow: 'Maison de beauté · Haïti 🇭🇹',
    titleBefore: 'Révélez votre',
    titleAccent: 'éclat',
    titleAfter: 'naturel.',
    desc: "Une sélection raffinée de soins, de maquillage et d'accessoires, choisis avec amour rien que pour vous. Ici, on vous chouchoute comme une amie. 💕",
    primaryBtn: 'Découvrir la boutique',
    secondaryBtn: 'Voir les coups de cœur',
    ratingScore: '4.9/5',
    ratingText: 'adorée par nos clientes ✨',
    image: '/Screenshot 2026-09-04 095351.png',
    badgeTopValue: '4.9',
    badgeTopLabel: 'Avis clientes',
    badgeBottomTitle: '100% Authentique',
    badgeBottomLabel: 'Qualité premium',
  },
  benefits: [
    { title: 'Livraison rapide', text: 'Gratuite dès 75 000 HTG, partout en Haïti.' },
    { title: '100% Authentique', text: 'Des produits vérifiés et de vraie qualité premium.' },
    { title: 'Commande facile', text: 'On finalise ensemble sur WhatsApp, en toute simplicité.' },
    { title: 'Avec amour', text: 'Chaque commande est préparée avec soin et attention.' },
  ],
  featured: {
    eyebrow: 'Nos préférés',
    title: 'Coups de Cœur 💖',
    subtitle: 'Les petits trésors que nos clientes adorent',
  },
  welcome: {
    eyebrow: 'Notre histoire',
    title: "Plus qu'une boutique, une petite famille.",
    p1: "Naï Beauty est né d'une envie toute simple : rendre la beauté accessible, douce et joyeuse. On sélectionne chaque produit comme si c'était pour nous-mêmes, et on vous accompagne à chaque étape.",
    p2: "Vous n'êtes pas juste une cliente ici, vous faites partie de la famille Naï. 🌷",
    btn: "Rejoindre l'aventure",
    image: '/Screenshot 2026-09-04 095413.png',
  },
  categories: {
    title: 'Explorez nos univers',
    subtitle: 'Trouvez ce qui vous ressemble',
    cards: [
      { name: 'Maquillage', image: '/Screenshot 2026-09-04 095413.png' },
      { name: 'Maison & Accessoires', image: '/Screenshot 2026-09-04 095441.png' },
    ],
  },
  testimonials: {
    eyebrow: 'Elles nous adorent',
    title: 'Ce que disent nos clientes',
    list: [
      { name: 'Sabine L.', text: "Franchement le meilleur service ! Ma commande est arrivée super vite et l'emballage était trop mignon. 💕", loc: 'Port-au-Prince' },
      { name: 'Nadège P.', text: "Produits authentiques et l'équipe est adorable sur WhatsApp. Je recommande les yeux fermés !", loc: 'Cap-Haïtien' },
      { name: 'Wideline J.', text: "J'ai adoré mon gloss, la qualité est top. On sent qu'ils prennent soin de leurs clientes. Merci Naï !", loc: 'Pétion-Ville' },
    ],
  },
  cta: {
    title: 'Prête à vous faire plaisir ? 🥰',
    text: 'Rejoignez la famille Naï Beauty et révélez votre plus bel éclat.',
    btn: 'Je découvre la boutique',
  },
};

// Fusion récursive : garantit que les nouvelles clés par défaut existent
// même si un ancien contenu est déjà sauvegardé.
const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
const deepMerge = (base, override) => {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (isObject(base)) {
    const out = { ...base };
    if (isObject(override)) {
      for (const key of Object.keys(base)) {
        out[key] = deepMerge(base[key], override[key]);
      }
    }
    return out;
  }
  return override === undefined ? base : override;
};

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('naiSiteContent');
      return saved ? deepMerge(defaultContent, JSON.parse(saved)) : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('naiSiteContent', JSON.stringify(content));
    } catch {
      window.alert('Image trop volumineuse pour le stockage du navigateur. Choisissez une image plus légère.');
    }
  }, [content]);

  const updateContent = useCallback((next) => {
    setContent((prev) => deepMerge(prev, next));
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};
