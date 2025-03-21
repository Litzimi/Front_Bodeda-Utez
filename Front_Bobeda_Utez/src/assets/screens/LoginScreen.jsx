import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginScreen.css";

function LoginScreen() {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate("/AdminPrincipal"); 
  };

  const handleForgot = () => {
    navigate("/OlvidarContrasena");  
  };

  return (
    <div className="container">
      <div className="izquierda">
        <img
          className="imagenPrincipal"
          src="/img/Logo_Bobeda_Cajas.png"
          alt="Logo"
        />
      </div>
      <div className="derecha">
        <img className="logo" src="/img/Logo_Bobeda.png" alt="Logo" />
        <p>Boveda UTEZ</p>
        <h3>Iniciar sesión</h3>
        <p>Usuario:</p>
        <input type="text" name="username" placeholder="Correo Electrónico" />
        <p>Contraseña:</p>
        <input type="password" name="password" placeholder="Contraseña" />
        <p onClick={handleForgot}>¿Se te olvido tu contrasena?</p>
        <button type="submit" onClick={handleLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
}

export default LoginScreen;