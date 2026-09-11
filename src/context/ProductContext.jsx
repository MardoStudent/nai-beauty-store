import React, { createContext, useState, useEffect } from 'react';

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

  // Save to local storage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem('naiProducts', JSON.stringify(products));
    } catch {
      window.alert('Image trop volumineuse pour le stockage du navigateur. Choisissez une image plus légère.');
    }
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
