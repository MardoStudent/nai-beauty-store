import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { LogOut, Plus, Trash2, Edit2, Upload, X, Package, LayoutTemplate } from 'lucide-react';
import { CURRENCY } from '../config';
import SiteContentEditor from '../components/SiteContentEditor';
import { readImageAsDataUrl } from '../utils/image';

const EMPTY_PRODUCT = { name: '', brand: '', price: '', image: '', category: '' };

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'content'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = ajout, sinon = édition
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      brand: product.brand || '',
      price: product.price || '',
      image: product.image || '',
      category: product.category || '',
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readImageAsDataUrl(file)
      .then((image) => setForm((f) => ({ ...f, image })))
      .catch((error) => window.alert(error.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      image: form.image || '/WhatsApp Image 2026-08-31 at 21.14.20.jpeg',
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    closeForm();
  };

  return (
    <div className="admin-dashboard page-transition pt-32 mb-12">
      <div className="container">
        <div className="admin-header flex-between mb-8">
          <div>
            <h1 className="section-title">Tableau de Bord</h1>
            <p className="section-subtitle">Gestion des produits Naï Beauty</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary flex-center gap-2">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>

        {/* Onglets */}
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <Package size={18} /> Produits
          </button>
          <button className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
            <LayoutTemplate size={18} /> Contenu du site
          </button>
        </div>

        {activeTab === 'products' && (
        <div className="admin-content">
          <div className="admin-toolbar flex-between mb-4">
            <h3 className="font-heading text-xl">Vos Produits ({products.length})</h3>
            <button onClick={isFormOpen ? closeForm : openAddForm} className="btn-primary flex-center gap-2">
              {isFormOpen ? <><X size={16} /> Fermer</> : <><Plus size={16} /> Ajouter un produit</>}
            </button>
          </div>

          {isFormOpen && (
            <div className="glass-card add-product-form mb-8 animate-fade-in">
              <h4 className="font-heading mb-4 text-lg">
                {editingId ? '✏️ Modifier le produit' : '✨ Nouveau produit'}
              </h4>
              <form onSubmit={handleSubmit} className="grid-form">
                <div className="input-group">
                  <label>Nom du produit</label>
                  <input type="text" placeholder="Ex: Gloss Rose" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="modern-input" />
                </div>
                <div className="input-group">
                  <label>Marque</label>
                  <input type="text" placeholder="Ex: Naï Makeup" required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="modern-input" />
                </div>
                <div className="input-group">
                  <label>Prix ({CURRENCY})</label>
                  <input type="number" placeholder="Ex: 2500" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="modern-input" />
                </div>
                <div className="input-group">
                  <label>Catégorie</label>
                  <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="modern-input">
                    <option value="">Sélectionner...</option>
                    <option value="Soins">Soins du Visage</option>
                    <option value="Maquillage">Maquillage</option>
                    <option value="Parfums">Parfums</option>
                    <option value="Appareils">Appareils</option>
                    <option value="Maison">Maison & Accessoires</option>
                  </select>
                </div>

                {/* Upload d'image */}
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Image du produit</label>
                  <div className="image-upload-row">
                    <div className="image-preview">
                      {form.image ? (
                        <img src={form.image} alt="Aperçu" />
                      ) : (
                        <span className="image-preview-empty">Aperçu</span>
                      )}
                    </div>
                    <div className="image-upload-actions">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <button type="button" className="btn-secondary flex-center gap-2" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={16} /> Choisir une image
                      </button>
                      <span className="upload-hint">ou collez un lien ci-dessous</span>
                      <input
                        type="text"
                        placeholder="https://... ou /image.jpg"
                        value={form.image?.startsWith('data:') ? '' : form.image}
                        onChange={e => setForm({ ...form, image: e.target.value })}
                        className="modern-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group submit-group" style={{ display: 'flex', alignItems: 'flex-end', gridColumn: '1 / -1' }}>
                  <button type="submit" className="btn-primary w-full">
                    {editingId ? 'Enregistrer les modifications' : 'Ajouter le produit'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="product-list glass-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Produit</th>
                    <th>Catégorie</th>
                    <th>Prix ({CURRENCY})</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name} className="admin-thumb" />
                      </td>
                      <td className="font-medium">
                        <div>{product.name}</div>
                        <div className="text-xs text-gray">{product.brand}</div>
                      </td>
                      <td>
                        <span className="badge">{product.category || 'Général'}</span>
                      </td>
                      <td className="font-medium">{Number(product.price).toLocaleString('fr-HT')}</td>
                      <td className="actions-cell text-right">
                        <button className="icon-btn text-gray hover-primary mr-2" title="Modifier" onClick={() => openEditForm(product)}><Edit2 size={18} /></button>
                        <button className="icon-btn text-danger hover-danger" onClick={() => deleteProduct(product.id)} title="Supprimer"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray">Aucun produit dans l'inventaire. Ajoutez-en un !</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'content' && <SiteContentEditor />}
      </div>
    </div>
  );
};

export default AdminDashboard;
