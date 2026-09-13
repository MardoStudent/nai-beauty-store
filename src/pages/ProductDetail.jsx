import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import MasonryCard from '../components/MasonryCard';
import { ShoppingBag, Plus, Minus, ArrowLeft, Check, Share2 } from 'lucide-react';
import { CURRENCY, STORE_NAME } from '../config';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => String(p.id) === String(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) {
    return (
      <div className="page-container page-transition pt-32 mb-12">
        <div className="container text-center empty-state">
          <h2 className="section-title">Produit introuvable</h2>
          <p className="section-subtitle">Ce produit n'existe plus ou a été retiré.</p>
          <Link to="/shop" className="btn-primary mt-4">Retour à la boutique</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.id}`;
    const text = `Regarde ce produit chez ${STORE_NAME} : ${product.name} — ${Number(product.price).toLocaleString('fr-HT')} ${CURRENCY}`;
    // Sur mobile : menu de partage natif (WhatsApp, Insta, etc.)
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url });
        return;
      } catch {
        return; // l'utilisateur a annulé
      }
    }
    // Sinon : ouvrir WhatsApp directement
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank', 'noopener,noreferrer');
  };

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <div className="page-container page-transition pt-32 mb-12">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Retour
        </button>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            {product.category && <span className="pin-cat-tag">{product.category}</span>}
          </div>

          <div className="product-detail-info">
            <span className="product-brand">{product.brand || STORE_NAME}</span>
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-price">
              {Number(product.price).toLocaleString('fr-HT')} {CURRENCY}
            </div>

            <p className="product-detail-desc">
              {product.description ||
                `Découvrez ${product.name}, une pièce d'exception signée ${product.brand || STORE_NAME}. Sélectionnée avec soin pour sa qualité premium et son élégance, elle sublimera votre routine beauté au quotidien.`}
            </p>

            <div className="detail-actions">
              <div className="qty-control detail-qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Moins">
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Plus">
                  <Plus size={16} />
                </button>
              </div>

              <button className={`btn-primary detail-add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
                {added ? (
                  <><Check size={18} /> Ajouté !</>
                ) : (
                  <><ShoppingBag size={18} /> Ajouter au panier</>
                )}
              </button>

              <button className="detail-share-btn" onClick={handleShare} title="Partager ce produit" aria-label="Partager">
                <Share2 size={18} />
              </button>
            </div>

            <ul className="detail-perks">
              <li>✓ Produit 100% authentique</li>
              <li>✓ Livraison rapide en Haïti</li>
              <li>✓ Paiement & confirmation via WhatsApp</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section">
            <h2 className="section-title text-center" style={{ marginBottom: '2rem' }}>
              Vous aimerez aussi
            </h2>
            <div className="masonry-grid">
              {related.map((p) => (
                <MasonryCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
