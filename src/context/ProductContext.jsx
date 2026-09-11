import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const ProductContext = createContext();

// Default products to populate the store initially
const defaultProducts = [
  { id: 1, name: 'Eau de Parfum Bloom', brand: 'Gucci', price: 4950, image: '/Screenshot 2026-09-04 095351.png', category: 'Parfums' },
  { id: 2, name: 'Gloss Brillance Ultime', brand: 'Naï Makeup', price: 2700, image: '/Screenshot 2026-09-04 095413.png', category: 'Maquillage' },
  { id: 3, name: 'Roller Quartz Rose', brand: 'Naï Devices', price: 4050, image: '/WhatsApp Image 2026-08-31 at 21.15.48.jpeg', category: 'Appareils' },
  { id: 4, name: 'Tumbler Nœud Bleu', brand: 'Naï Home', price: 2200, image: '/Screenshot 2026-09-04 095441.png', category: 'Maison' }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('naiProducts');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    if (!supabase) return;
    supabase.from('products').select('*').order('created_at', { ascending: true }).then(({ data, error }) => {
      if (!error && data?.length) setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (supabase) return;
    try {
      localStorage.setItem('naiProducts', JSON.stringify(products));
    } catch {
      window.alert('Image trop volumineuse pour le stockage du navigateur. Choisissez une image plus légère.');
    }
  }, [products]);

  const addProduct = async (product) => {
    if (supabase) {
      const { data, error } = await supabase.from('products').insert(product).select().single();
      if (error) throw error;
      setProducts((current) => [...current, data]);
      return;
    }
    setProducts((current) => [...current, { ...product, id: Date.now() }]);
  };

  const updateProduct = async (id, updatedProduct) => {
    if (supabase) {
      const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select().single();
      if (error) throw error;
      setProducts((current) => current.map((product) => product.id === id ? data : product));
      return;
    }
    setProducts((current) => current.map((product) => product.id === id ? { ...product, ...updatedProduct } : product));
  };

  const deleteProduct = async (id) => {
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    }
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
