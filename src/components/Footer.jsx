import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Mail } from 'lucide-react';
import { CONTACT_EMAIL, INSTAGRAM_URL } from '../config';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer = () => {
  const location = useLocation();
  // Pied de page public masqué dans l'espace admin
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand">Naï Beauty Store</Link>
          <p className="footer-text">Révélez votre beauté naturelle avec notre collection Coquette Chic. Des soins premium, des accessoires uniques.</p>
          <div className="social-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-icon" title="Suivez-nous sur Instagram" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="social-icon" title="Écrivez-nous" aria-label="E-mail">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div className="footer-links-col">
          <h4>Boutique</h4>
          <ul>
            <li><Link to="/shop">Tous les produits</Link></li>
            <li><Link to="/shop">Soins Visage</Link></li>
            <li><Link to="/shop">Maquillage</Link></li>
            <li><Link to="/shop">Maison</Link></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4>Aide</h4>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>Contactez-nous</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="#">Livraison & Retours</a></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4>Légal</h4>
          <ul>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p className="footer-love">
          © 2026 Naï Beauty Store. Fait avec <Heart size={14} fill="#F4C2C2" color="#F4C2C2" /> pour vous.
        </p>
        <div className="footer-legal">
          <p className="footer-confidential">Document confidentiel · Tous droits réservés.</p>
          <p className="footer-copyright">© 2026 Axis Result Consulting.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
