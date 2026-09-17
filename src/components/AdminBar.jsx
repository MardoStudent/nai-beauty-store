import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { ADMIN_PATH } from '../config';

const AdminBar = () => {
  const location = useLocation();
  if (!location.pathname.startsWith(`/${ADMIN_PATH}`)) return null;

  return (
    <header className="admin-bar">
      <div className="admin-bar-inner">
        <div className="admin-bar-brand">
          <ShieldCheck size={18} />
          <span className="admin-bar-name">Naï Beauty</span>
          <span className="admin-bar-badge">Espace Admin</span>
        </div>
        <a className="admin-bar-link" href="/" target="_blank" rel="noopener noreferrer">
          Voir le site <ExternalLink size={14} />
        </a>
      </div>
    </header>
  );
};

export default AdminBar;
