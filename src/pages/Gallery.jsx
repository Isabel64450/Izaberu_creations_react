import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; 
import { Link } from 'react-router-dom';
import '../styles/gallery.css'
function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get('/products');
       
        setProducts(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>{error}</p>;

  if (products.length === 0) return <p>Aucun produit disponible</p>;


  
  return (
    <div className="gallery-container">
      <h2>Galerie des produits</h2>
      <div className="gallery-grid">
        {products.map(product => {
          
          
          const product_id = product.id || product.product_id;

         
          if (!product_id) return null;

          return (
            <Link key={product_id} to={`/products/${product_id}`} className="gallery-item">
              <img
                src={product.images?.[0] || 'placeholder.jpg'}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.price} €</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;