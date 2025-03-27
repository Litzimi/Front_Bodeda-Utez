import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginScreen.css";

function LoginScreen() {
  const navigate = useNavigate();

  // Estados para el email y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Validar que los campos no estén vacíos
      if (!email || !password) {
        setError("Por favor, ingresa tu correo y contraseña.");
        return;
      }

      // Hacer la solicitud POST al endpoint de login
      const response = await axios.post(
        "http://localhost:8080/api-BobedaUTEZ/user/login",
        {
          email,
          password,
        }
      );

      // Si la respuesta es exitosa, redirigir al usuario
      if (response.data) {
        // Guardar los datos del usuario en localStorage (opcional)
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/AdminPrincipal");
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error:", err);
    }
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
        <input
          type="text"
          name="username"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>Contraseña:</p>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p onClick={handleForgot}>¿Se te olvidó tu contraseña?</p>

        <button type="submit" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
