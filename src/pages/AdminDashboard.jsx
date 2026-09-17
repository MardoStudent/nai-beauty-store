import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { LogOut, Plus, Trash2, Edit2, Upload, X, Package, LayoutTemplate, Search, PackageOpen, ImageOff } from 'lucide-react';
import { CURRENCY, ADMIN_PATH } from '../config';
import SiteContentEditor from '../components/SiteContentEditor';
import { readImageAsDataUrl } from '../utils/image';
import { compressImage } from '../utils/compressImage';
import { supabase } from '../supabaseClient';
import { uploadImage } from '../lib/storage';

const PRESET_CATEGORIES = ['Soins', 'Maquillage', 'Parfums', 'Appareils', 'Maison'];

const EMPTY_PRODUCT = { name: '', brand: '', price: '', image: '', category: '' };

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'content'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = ajout, sinon = édition
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [uploading, setUploading] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [adminQuery, setAdminQuery] = useState('');
  const fileInputRef = useRef(null);

  const filteredProducts = products.filter((p) => {
    const q = adminQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  const confirmDelete = (product) => {
    if (window.confirm(`Supprimer « ${product.name} » ? Cette action est définitive.`)) {
      deleteProduct(product.id);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
      navigate(`/${ADMIN_PATH}`);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
    setIsCustomCategory(false);
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
    setIsCustomCategory(Boolean(product.category) && !PRESET_CATEGORIES.includes(product.category));
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
    setIsCustomCategory(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const optimized = await compressImage(file);
      let image;
      if (supabase) {
        try {
          image = await uploadImage(optimized); // stockage en ligne (idéal)
        } catch {
          image = await readImageAsDataUrl(optimized); // secours si le bucket n'existe pas
        }
      } else {
        image = await readImageAsDataUrl(optimized);
      }
      setForm((f) => ({ ...f, image }));
    } catch (error) {
      window.alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      image: form.image || '/WhatsApp Image 2026-08-31 at 21.14.20.jpeg',
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }
      closeForm();
    } catch (error) {
      window.alert(`Impossible d'enregistrer le produit : ${error.message}`);
    }
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
                  <select
                    required={!isCustomCategory}
                    value={isCustomCategory ? '__autre__' : form.category}
                    onChange={e => {
                      if (e.target.value === '__autre__') {
                        setIsCustomCategory(true);
                        setForm({ ...form, category: '' });
                      } else {
                        setIsCustomCategory(false);
                        setForm({ ...form, category: e.target.value });
                      }
                    }}
                    className="modern-input"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Soins">Soins du Visage</option>
                    <option value="Maquillage">Maquillage</option>
                    <option value="Parfums">Parfums</option>
                    <option value="Appareils">Appareils</option>
                    <option value="Maison">Maison & Accessoires</option>
                    <option value="__autre__">➕ Autre (préciser)...</option>
                  </select>
                  {isCustomCategory && (
                    <input
                      type="text"
                      required
                      placeholder="Nom de la nouvelle catégorie"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="modern-input"
                      style={{ marginTop: '0.6rem' }}
                      autoFocus
                    />
                  )}
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
                      <button type="button" className="btn-secondary flex-center gap-2" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                        <Upload size={16} /> {uploading ? 'Envoi en cours...' : 'Choisir une image'}
                      </button>
                      <span className="upload-hint">Photo optimisée automatiquement (rapide, même en gros fichier). Ou collez un lien ci-dessous.</span>
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
                  <button type="submit" className="btn-primary w-full" disabled={uploading}>
                    {uploading ? 'Photo en cours...' : (editingId ? 'Enregistrer les modifications' : 'Ajouter le produit')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Recherche admin (utile dès qu'il y a beaucoup de produits) */}
          {products.length > 0 && (
            <div className="admin-search">
              <Search size={18} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Rechercher dans vos produits..."
                value={adminQuery}
                onChange={(e) => setAdminQuery(e.target.value)}
                className="admin-search-input"
              />
              {adminQuery && (
                <button className="admin-search-clear" onClick={() => setAdminQuery('')} aria-label="Effacer">
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Liste des produits en cartes */}
          {products.length === 0 ? (
            <div className="admin-empty glass-card">
              <PackageOpen size={48} strokeWidth={1.3} />
              <h4>Aucun produit pour le moment</h4>
              <p>Clique sur « Ajouter un produit » pour créer ta première fiche. ✨</p>
              <button onClick={openAddForm} className="btn-primary flex-center gap-2">
                <Plus size={16} /> Ajouter un produit
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="admin-empty glass-card">
              <Search size={44} strokeWidth={1.3} />
              <h4>Aucun résultat</h4>
              <p>Aucun produit ne correspond à « {adminQuery} ».</p>
            </div>
          ) : (
            <div className="admin-product-grid">
              {filteredProducts.map((product) => (
                <div className="admin-product-card" key={product.id}>
                  <div className="admin-card-media">
                    {product.image ? (
                      <img src={product.image} alt={product.name} loading="lazy" />
                    ) : (
                      <div className="admin-card-noimg"><ImageOff size={28} /></div>
                    )}
                    {product.category && <span className="admin-card-cat">{product.category}</span>}
                    <div className="admin-card-actions">
                      <button className="admin-action-btn edit" title="Modifier" onClick={() => openEditForm(product)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="admin-action-btn delete" title="Supprimer" onClick={() => confirmDelete(product)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="admin-card-body">
                    <span className="admin-card-brand">{product.brand || 'Naï Beauty'}</span>
                    <h4 className="admin-card-name">{product.name}</h4>
                    <div className="admin-card-price">{Number(product.price).toLocaleString('fr-HT')} {CURRENCY}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {activeTab === 'content' && <SiteContentEditor />}
      </div>
    </div>
  );
};

export default AdminDashboard;
