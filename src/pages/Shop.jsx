import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import MasonryCard from '../components/MasonryCard';
import { Search } from 'lucide-react';

const CATEGORIES = ['Tout', 'Soins', 'Maquillage', 'Parfums', 'Appareils', 'Maison'];

const Shop = () => {
  const { products } = useContext(ProductContext);
  const [activeCat, setActiveCat] = useState('Tout');
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeCat === cat ? 'active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default Shop;
