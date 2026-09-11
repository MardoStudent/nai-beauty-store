import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { CURRENCY } from '../config';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        {product.category && <span className="product-cat-tag">{product.category}</span>}
        <div className="product-overlay">
          <button className="add-to-cart-btn" onClick={handleAdd}>
            <ShoppingBag size={16} /> Ajouter
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand || 'Naï Beauty'}</span>
        <h4 className="product-title">{product.name}</h4>
        <div className="product-price">{Number(product.price).toLocaleString('fr-HT')} {CURRENCY}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
