import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import MasonryCard from '../components/MasonryCard';
import { Search } from 'lucide-react';

const BASE_CATEGORIES = ['Soins', 'Maquillage', 'Parfums', 'Appareils', 'Maison'];

const Shop = () => {
  const { products, loading } = useContext(ProductContext);
  const [activeCat, setActiveCat] = useState('Tout');
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Catégories = les catégories de base + toute catégorie perso ajoutée par l'admin
  const categories = useMemo(() => {
    const custom = products
      .map((p) => p.category)
      .filter((c) => c && !BASE_CATEGORIES.includes(c));
    return ['Tout', ...BASE_CATEGORIES, ...[...new Set(custom)]];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCat === 'Tout' || p.category === activeCat;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [products, activeCat, query]);

  return (
    <div className="page-container page-transition pt-32">
      <div className="container">
        <div className="section-header text-center">
          <span className="hero-tag">Notre sélection</span>
          <h1 className="section-title">La Boutique</h1>
          <p className="section-subtitle">Toute la collection Naï Beauty, rien que pour vous ✨</p>
        </div>

        {/* Barre de recherche */}
        <div className="shop-search">
          <Search size={18} className="shop-search-icon" />
          <input
            type="text"
            placeholder="Rechercher un produit, une marque..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="shop-search-input"
          />
        </div>

        {/* Filtres catégories */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeCat === cat ? 'active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="masonry-grid mb-12" style={{ marginTop: '2rem' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="pin-card" key={i}>
                <div className="skeleton skeleton-img" style={{ height: `${180 + (i % 3) * 60}px` }} />
                <div className="skeleton skeleton-line" style={{ width: '40%' }} />
                <div className="skeleton skeleton-line" style={{ width: '80%' }} />
                <div className="skeleton skeleton-line" style={{ width: '30%' }} />
              </div>
            ))}
          </div>
        ) : (
        <>
        <p className="results-count">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>Aucun produit ne correspond à votre recherche 🌸</p>
          </div>
        ) : (
          <div className="masonry-grid mb-12">
            {filtered.map((product) => (
              <MasonryCard key={product.id} product={product} />
            ))}
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default Shop;
