import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, openCart } = useContext(CartContext);

  // Barre publique masquée dans l'espace admin (il a sa propre barre)
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <button className="icon-btn menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="nav-brand">Naï Beauty</Link>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
          <li><Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Boutique</Link></li>
        </ul>

        <div className="nav-icons">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn relative" onClick={openCart} aria-label="Ouvrir le panier">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
