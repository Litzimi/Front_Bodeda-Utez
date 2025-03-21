import React from "react";
import "./OlvidarContrasena.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

function OlvidarContrasena() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/codigo");
  };

  return (
    <>
      <main>
        <div className="parte-izquierda">
        <img src="/img/Logo_Bobeda_Cajas.png" className="img-nav"/>
          <div className="izquierda-form">
            <p onClick={() => navigate("/")}>Volver al inicio de sesión</p>
            <h1>¿Olvidaste tu contraseña?</h1>
            <p className="texto">
              No te preocupes, ingresa tu correo electrónico. Te enviaremos un
              correo electrónico con la información necesaria para poder
              restablecer tu contraseña.
            </p>
            <input
              type="text"
              name="correo"
              placeholder="Ingresa tu correo"
              className="correo"
            />
            <button type="submit" onClick={handleLogin}>
              Enviar
            </button>
          </div>
        </div>
        <div className="parte-derecha">
          <img src="/img/contrasena.png" className="img-derecha" alt="Contraseña" />
        </div>
      </main>
    </>
  );
}

export default OlvidarContrasena;