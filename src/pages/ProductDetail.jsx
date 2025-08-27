import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../contex/CartContex';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; 
import '../styles/productDetail.css'
function ProductDetail() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const { fetchItemCount } = useContext(CartContext);


  const getOrCreateCartId = (customerId) => {
    if (customerId) {
      return `cart-${customerId}`;
    } else {
      let guestCartId = localStorage.getItem('cart_id');
      if (!guestCartId) {
        guestCartId = 'guest-' + crypto.randomUUID();
        localStorage.setItem('cart_id', guestCartId);
      }
      return guestCartId;
    }
  };
useEffect(() => {
  async function fetchProduct() {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      
      setProduct(response.data);
      if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      setLoading(false);
    } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
      setError("Impossible de charger le produit.");
      setLoading(false);
    }
  }
  fetchProduct();
}, [productId]);
const handleAddToCart= async(product)=> {
   try {
    
    const cartId = getOrCreateCartId()
    const cartItem = {
      cart_id: cartId, 
      cart_item_ref: `ref-${product.product_id}`, 
      product_id: product.product_id,
      unit_price: product.price,
      shipping_fee: 0, // ou logique pour calculer
      added_at: new Date().toDateString().slice(0,19).replace('T','')
      
    };

     await axiosInstance.post('/cart', cartItem);
     fetchItemCount();
    alert("Produit ajouté au panier !");
  } catch (error) {
    console.error("Erreur lors de l’ajout au panier :", error);
    alert("Erreur : impossible d’ajouter au panier.");
  }
}
  
if (loading) return <p>Chargement du produit...</p>;
if (error) return <p>{error}</p>;
if (!product) return <p>Produit introuvable.</p>;

  return (
     <div className="product-detail-container">
     

      <div className="product-content">
       
        <div className="product-images">
          <div className="main-image">
            {selectedImage ? (
              <img src={selectedImage} alt="Produit" />
            ) : (
              <p>Aucune image</p>
            )}
          </div>
          <div className="thumbnails">
            {product.images?.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Miniature ${idx + 1}`}
                className={selectedImage === imgUrl ? 'thumbnail selected' : 'thumbnail'}
                onClick={() => setSelectedImage(imgUrl)}
              />
            ))}
          </div>
        </div>

        
        <div className="product-details">
  <h1>{product.product_category_name}</h1>
  <p className="product-category">Catégorie : {product.category}</p>
  <p className="product-description">{product.description}</p>

  <div className="product-meta">
    <p><strong>Dimensions :</strong> {product.product_lenght_cm} x {product.product_width_cm} x {product.product_height_cm} cm</p>
    <p><strong>Poids :</strong> {product.product_weight_g} g</p>
  </div>

  <p className="product-price">Prix : {product.price} €</p>

  <div className="add-to-cart">
    <button onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
     <Link to="/cart">
  <button>Voir le panier</button>
</Link> 
 <Link to="/gallery">
 <button>Retour au galerie</button>
 </Link>
  </div>
</div>
      </div>
    </div>
  );
   
}

export default ProductDetail;