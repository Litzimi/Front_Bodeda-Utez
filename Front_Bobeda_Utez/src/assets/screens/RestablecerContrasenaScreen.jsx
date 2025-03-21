import React, { useState } from "react";
import "./RestablecerContrasenaCss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OlvidarContrasena.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function RestablecerContrasenaScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = () => {
    navigate("/codigo");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <main>
        <div className="parte-izquierda">
        <img src="/img/Logo_Bobeda_Cajas.png" className="img-nav" alt="Logo"/>
          <div className="izquierda-form">
            <p onClick={() => navigate("/")}>Volver al inicio de sesión</p>
            <h1>Ingresa la contraseña nueva</h1>
            <p className="texto">
              Tu contraseña antigua fue restablecida, por favor ingresa una nueva.
            </p>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa la contraseña nueva"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="password-toggle-icon"
              />
            </div>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirma tu nueva contraseña"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle-icon"
              />
            </div>
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

export default RestablecerContrasenaScreen;