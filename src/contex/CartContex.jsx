import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemCount, setItemCount] = useState(0);

  
  const fetchItemCount = async () => {
    const cartId = localStorage.getItem('cart_id');
    if (!cartId) {
      setItemCount(0);
      return;
    }
    try {
      const res = await axiosInstance.get(`/cart/${cartId}/count`);
      setItemCount(res.data.itemCount || res.data.count || 0);
    } catch (err) {
      console.error("Erreur chargement panier:", err);
      setItemCount(0);
    }
  };


const clearCart = () => {
    localStorage.removeItem('cart_id');
    setItemCount(0);
  };





  useEffect(() => {
    fetchItemCount();
  }, []);

  return (
    <CartContext.Provider value={{ itemCount, setItemCount, fetchItemCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}