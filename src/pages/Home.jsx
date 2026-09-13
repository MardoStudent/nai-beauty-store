import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { SiteContentContext } from '../context/SiteContentContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, ShieldCheck, MessageCircle, Heart, Star, Sparkles } from 'lucide-react';

const BENEFIT_ICONS = [Truck, ShieldCheck, MessageCircle, Heart];

const Home = () => {
  const { products } = useContext(ProductContext);
  const { content } = useContext(SiteContentContext);
  const { hero, benefits, featured, welcome, categories, testimonials, cta } = content;

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="page-transition">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow reveal" style={{ '--d': '0s' }}>
              <span className="eyebrow-dot" /> {hero.eyebrow}
            </span>
            <h1 className="hero-title reveal" style={{ '--d': '0.1s' }}>
              {hero.titleBefore} <em>{hero.titleAccent}</em> {hero.titleAfter}
            </h1>
            <p className="hero-desc reveal" style={{ '--d': '0.2s' }}>
              {hero.desc}
            </p>
            <div className="hero-actions reveal" style={{ '--d': '0.3s' }}>
              <Link to="/shop" className="btn-primary">
                {hero.primaryBtn} <ArrowRight size={18} />
              </Link>
              <a href="#featured" className="btn-ghost">{hero.secondaryBtn}</a>
            </div>
            <div className="hero-rating reveal" style={{ '--d': '0.4s' }}>
              <div className="hero-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D48B8B" color="#D48B8B" />)}
              </div>
              <p><strong>{hero.ratingScore}</strong> · {hero.ratingText}</p>
            </div>
          </div>

          <div className="hero-visual reveal" style={{ '--d': '0.25s' }}>
            <div className="hero-frame">
              <img src={hero.image} alt="Collection Naï Beauty" />
            </div>
            <div className="hero-ring" aria-hidden="true" />
            <div className="hero-badge hero-badge-top">
              <Star size={18} fill="#D48B8B" color="#D48B8B" />
              <div>
                <strong>{hero.badgeTopValue}</strong>
                <span>{hero.badgeTopLabel}</span>
              </div>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <span className="badge-emoji">🌸</span>
              <div>
                <strong>{hero.badgeBottomTitle}</strong>
                <span>{hero.badgeBottomLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <a href="#featured" className="hero-scroll" aria-label="Défiler vers le bas">
          <span className="hero-scroll-text">Explorer</span>
          <span className="hero-scroll-line" />
        </a>
      </section>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="marquee-item">Produits 100% Authentiques</span><span className="marquee-item">•</span>
          <span className="marquee-item">Design Coquette Chic</span><span className="marquee-item">•</span>
          <span className="marquee-item">Paiement Sécurisé</span><span className="marquee-item">•</span>
          <span className="marquee-item">Livraison partout en Haïti</span><span className="marquee-item">•</span>
          <span className="marquee-item">Produits 100% Authentiques</span><span className="marquee-item">•</span>
          <span className="marquee-item">Design Coquette Chic</span><span className="marquee-item">•</span>
          <span className="marquee-item">Paiement Sécurisé</span><span className="marquee-item">•</span>
          <span className="marquee-item">Livraison partout en Haïti</span>
        </div>
      </div>

      {/* BENEFITS / REASSURANCE */}
      <section className="section pb-0">
        <div className="container">
          <div className="benefits-grid">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <div className="benefit-card" key={i}>
                  <div className="benefit-icon"><Icon size={24} /></div>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section" id="featured">
        <div className="container">
          <div className="section-header home-featured-header">
            <div className="home-featured-title">
              <span className="hero-tag">{featured.eyebrow}</span>
              <h2 className="section-title">{featured.title}</h2>
              <p className="section-subtitle">{featured.subtitle}</p>
            </div>
            <Link to="/shop" className="view-all-link">Tout voir <ArrowRight size={16} /></Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* WELCOME / BRAND STORY */}
      <section className="section">
        <div className="container">
          <div className="welcome-banner">
            <div className="welcome-image">
              <img src={welcome.image} alt="L'univers Naï Beauty" />
            </div>
            <div className="welcome-text">
              <span className="hero-tag"><Sparkles size={14} /> {welcome.eyebrow}</span>
              <h2 className="section-title">{welcome.title}</h2>
              <p>{welcome.p1}</p>
              <p>{welcome.p2}</p>
              <Link to="/shop" className="btn-primary">{welcome.btn} <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES BANNER */}
      <section className="section pt-0">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title">{categories.title}</h2>
            <p className="section-subtitle">{categories.subtitle}</p>
          </div>
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {categories.cards.map((c, i) => (
              <div className="category-card" style={{ aspectRatio: '16/9' }} key={i}>
                <img src={c.image} alt={c.name} className="category-img" />
                <div className="category-overlay">
                  <h3 className="category-name">{c.name}</h3>
                  <Link to="/shop" className="category-link">Voir la collection ➔</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="hero-tag">{testimonials.eyebrow}</span>
            <h2 className="section-title">{testimonials.title}</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.list.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, s) => <Star key={s} size={16} fill="#F4C2C2" color="#F4C2C2" />)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{(t.name || '?').charAt(0)}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span className="testimonial-loc">{t.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRIENDLY CTA */}
      <section className="section pt-0">
        <div className="container">
          <div className="join-cta">
            <h2>{cta.title}</h2>
            <p>{cta.text}</p>
            <Link to="/shop" className="btn-primary">{cta.btn} <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
