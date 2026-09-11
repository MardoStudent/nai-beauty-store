import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, openCart } = useContext(CartContext);

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
          <li><Link to="/admin" className={location.pathname.includes('/admin') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
        </ul>

        <div className="nav-icons">
          <button className="icon-btn"><Search size={20} /></button>
          <Link to="/admin" className="icon-btn" title="Espace Admin"><User size={20} /></Link>
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
