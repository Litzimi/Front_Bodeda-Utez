
import React from "react";
import "./OlvidarContrasena.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import { useNavigate } from "react-router-dom";

function OlvidarContrasena() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/restablecer"); 
  };

  return (
    <>

   <main>
        <div className="parte-izquierda">
        <img src="/img/Logo_Bobeda_Cajas.png" className="img-nav" alt="Logo"/>
            <div className="izquierda-form">
                <p onClick={() => navigate("/")}>Volver al incio de sesion</p>
                <h1>Codigo de verificacion</h1>
                <p className="texto">Ingresa el codigo que enviamos a tu correo.</p>
                <input type="text" placeholder="Codigo"></input>
                <button type="submit" onClick={handleLogin}>Enviar</button>
            </div>
        </div>
        <div className="parte-derecha">
            <img src="/img/contrasena.png" className="img-derecha"/>
        </div>
   </main>
   </>
  );
}

export default OlvidarContrasena;
