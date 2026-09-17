import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { SiteContentProvider } from './context/SiteContentContext';
import Navbar from './components/Navbar';
import AdminBar from './components/AdminBar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ADMIN_PATH } from './config';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <SiteContentProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <AdminBar />
            <Cart />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/confidentialite" element={<Confidentialite />} />
                <Route path={`/${ADMIN_PATH}`} element={<AdminLogin />} />
                <Route path={`/${ADMIN_PATH}/dashboard`} element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <FloatingWhatsApp />
          </div>
          <Analytics />
        </Router>
      </CartProvider>
      </SiteContentProvider>
    </ProductProvider>
  );
}

export default App;
