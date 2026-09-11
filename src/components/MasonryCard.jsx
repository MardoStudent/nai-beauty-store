import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { CURRENCY } from '../config';

const MasonryCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="pin-card">
      <div className="pin-image-wrapper">
        <img src={product.image} alt={product.name} className="pin-img" loading="lazy" />

        {product.category && <span className="pin-cat-tag">{product.category}</span>}

        <button className="pin-quick-add" onClick={handleAdd} aria-label="Ajouter au panier">
          <Plus size={20} />
        </button>

        <div className="pin-hover">
          <button className="pin-add-btn" onClick={handleAdd}>
            <ShoppingBag size={16} /> Ajouter au panier
          </button>
        </div>
      </div>

      <div className="pin-info">
        <span className="pin-brand">{product.brand || 'Naï Beauty'}</span>
        <h4 className="pin-name">{product.name}</h4>
        <div className="pin-price">{Number(product.price).toLocaleString('fr-HT')} {CURRENCY}</div>
      </div>
    </Link>
  );
};

export default MasonryCard;
