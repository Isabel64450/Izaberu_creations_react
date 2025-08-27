import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contex/CartContex';
import { useAuth } from '../contex/AuthContext';
import "../styles/cart.css"
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { fetchItemCount } = useContext(CartContext);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const getCartId = () => {
    
    return localStorage.getItem('cart_id');
  };

const updateQuantity = async (itemId, newQty) => {
  try {
    await axiosInstance.put(`/cart/${itemId}/quantity`, { quantity: newQty });
    if (newQty < 1) {
        
        setCartItems(prev => prev.filter(item => item.cart_item_id !== itemId));
      } 
      else {
        
        setCartItems(prev =>
          prev.map(item =>
            item.cart_item_id === itemId ? { ...item, quantity: newQty } : item
          )
        );

        
      } fetchItemCount();
  } catch (error) {
    console.error("Erreur mise à jour quantité :", error);
    alert("Impossible de mettre à jour la quantité");
  }
};






  useEffect(() => {
    async function fetchCartItems() {
      setLoading(true);
      setError(null);
      try {
        const cartId = getCartId();
        if (!cartId) {
          setCartItems([]);
          setLoading(false);
          fetchItemCount();
          return;
        }
        const response = await axiosInstance.get(`/cart/${cartId}`);
        setCartItems(response.data);
        fetchItemCount();
      } catch (err) {
        console.error("Erreur récupération panier:", err);
        setError("Impossible de charger le panier");
      } finally {
        setLoading(false);
      }
    }
    fetchCartItems();
  }, []);

  if (loading || authLoading) return <p>Chargement...</p>;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      localStorage.setItem('checkout_pending', 'true');
      alert("Vous devez vous connecter avant de commander.");
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };
 
  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.unit_price) * (item.quantity || 1);
  }, 0);

  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p>{error}</p>;
  if (cartItems.length === 0) return <p>Votre panier est vide.</p>;

  return (
     <div className="cart-container">
      <h1>Mon Panier</h1>
      <ul className="cart-items-list">
        {cartItems.map(item => (
          <li key={item.cart_item_id} className="cart-item">
            <img src={item.image || '/default-product.png'} alt={item.product_name || 'Produit'} width={80} />
            <div className="cart-item-info">
              <p>{item.product_name}</p>
              <p>Prix unitaire : {item.unit_price} €</p>
              
              <p className="cart-item-total">Total : {(parseFloat(item.unit_price) * (item.quantity || 1)).toFixed(2)} €</p>
            </div>
            <div className="cart-item-actions">
             <div className="cart-quantity-controls">
                <button
                  onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                  
                >-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock} 
                >+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total général : {total.toFixed(2)} €</h2>
      <button onClick={handleCheckout}>Commander</button>
    </div>
  );
}

export default Cart;