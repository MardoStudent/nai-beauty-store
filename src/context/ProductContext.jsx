import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Lire (Fetch) les produits depuis Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false }); // Les plus récents en premier
        
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Ajouter un produit (Insert)
  const addProduct = async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{ 
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          category: product.category
        }])
        .select(); // On demande à Supabase de nous renvoyer la ligne créée

      if (error) throw error;
      if (data) {
        setProducts([data[0], ...products]); // On ajoute le nouveau produit en haut de la liste
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error.message);
      alert('Erreur lors de la sauvegarde sur la base de données.');
    }
  };

  // 3. Modifier un produit (Update)
  const updateProduct = async (id, updatedFields) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedFields)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        setProducts(products.map(p => p.id === id ? data[0] : p));
      }
    } catch (error) {
      console.error('Erreur lors de la modification:', error.message);
    }
  };

  // 4. Supprimer un produit (Delete)
  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error.message);
      alert('Erreur lors de la suppression.');
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
