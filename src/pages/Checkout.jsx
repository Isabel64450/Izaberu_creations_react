import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contex/CartContex';
import { useAuth } from "../contex/AuthContext";



function Checkout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const navigate = useNavigate();
  const {clearCart, fetchItemCount } = useContext(CartContext);
const { isAuthenticated, loading: authLoading} = useAuth();
  useEffect(() => {
  if (authLoading) return;

  const checkout = async () => {
    try {
        
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      const meRes = await axiosInstance.get('/users/me');
      const user = meRes.data;
     
      if (!user?.id) {
        navigate('/login');
        return;
      }

      const cartId = localStorage.getItem('cart_id');
      if (!cartId) {
        setError("Aucun produit dans votre panier pour le moment. Explorez nos catégories et trouvez ce qui vous plaît !");
        return;
      }

      const orderId = crypto.randomUUID();
      const orderPayload = { orderId, user_id: user.id, cart_id: cartId };
      
      const orderRes = await axiosInstance.post('/orders', orderPayload);

      if (orderRes.status === 201) {
        setOrderSuccess(true);
        setOrderSuccess(true);
        setTimeout(()=>{
            clearCart();
        localStorage.removeItem('cart_id');
        fetchItemCount();
        setIsCleared(true);
    },4000);
        
      } else {
        setError("La commande n'a pas pu être créée.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError("Une erreur est survenue lors du traitement de votre commande.");
      }
    } finally {
      setLoading(false);
    }
  };

  checkout();
}, [authLoading, isAuthenticated, navigate, clearCart, fetchItemCount]);

  if (loading) return <p>Traitement de votre commande...</p>;
  if (error) return <p style={{ color: '#52796f' }}>{error}</p>;
  if (orderSuccess) {
    return (
      <div>
        <h2>Merci pour votre commande !</h2>
        <p>Vous recevrez un email de confirmation sous peu.</p>
      </div>
    );
  }

  return null;
}

export default Checkout;