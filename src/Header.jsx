import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../src/contex/AuthContext";
import IconIzaberu from "../src/icons/Izaberu-logo-90x90.gif";
import axiosInstance from "./api/axiosInstance";
import HeaderCartIcon from "../src/icons/HeaderCartIcon";


export default function Header() {
  const {isAuthenticated, setIsAuthenticated, loading}= useAuth();
  const navigate = useNavigate();

 
const handleLogout = async (e)=>{
  e.preventDefault()
  try{
    await axiosInstance.get("/users/logout");
    setIsAuthenticated(false);
    navigate("/");
  } catch(error){
    console.error("Erreur lors de la déconnexion", error)

  }
}
if (loading) return null



  return (
    <header>
      <div className="logo">
        <img src={IconIzaberu} alt="logo" />
      </div>
      <nav className="nav">
        <Link to="/">E-boutique</Link>
        <Link to="/gallery">Galerie</Link>
        <Link to="/register">Inscription</Link>
        {isAuthenticated && (
          <Link to="/add-product">Ajouter un produit</Link>
        )}
<div className="auth-link">
      {isAuthenticated ? (
        <Link to="/" onClick={handleLogout}>Déconnexion</Link>
      ) : (
        <Link to="/login">Connexion</Link>
      )}
    </div>
<HeaderCartIcon/>

      </nav>
      <div id="formulaire-container"></div>
    </header>
  );
}
