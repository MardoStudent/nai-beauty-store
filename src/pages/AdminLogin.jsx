import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '2026') { // Simple PIN for demo (year)
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Code PIN incorrect. Indice: 2026');
      setPin('');
    }
  };

  return (
    <div className="admin-login-wrapper page-transition">
      <img src="/Screenshot 2026-09-04 095351.png" alt="Background" className="login-bg" />
      <div className="glass-card login-card">
        <div className="login-icon">
          <Lock size={32} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Accès Sécurisé</h2>
        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Espace réservé à la direction Naï Beauty.
        </p>
        
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="password" 
            placeholder="Code PIN" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)}
            className="pin-input"
            maxLength={4}
            autoFocus
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary w-full mt-4" style={{ width: '100%', marginTop: '1rem' }}>
            Déverrouiller
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
