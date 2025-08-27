import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import axiosInstance from '../api/axiosInstance';
import { CartContext } from '../contex/CartContex';

function HeaderCartIcon() {
  const { itemCount } = useContext(CartContext);

  

  return (
    <Link to="/cart" className="cart-icon">
      <FaShoppingCart size={22} />
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </Link>
  );
}

export default HeaderCartIcon; 

