import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import LoginScreen from "./assets/screens/LoginScreen";
import AdminPrincipal from "./assets/screens/AdminPrincipal";
import RecursosScreenAdmin from "./assets/screens/RecursosScreenAdmin";
import InventariosAdmin from "./assets/screens/InventariosAdmin";
import OlvidarContrasena from "./assets/screens/OlvidarContrasena";
import EdificiosScreen from "./assets/screens/EdificiosScreen";
import ResponsablesScreen from "./assets/screens/ResponsablesScreen";
import UsuariosScreen from "./assets/screens/UsuariosScreen";
import TiposDeRecursosScreen from "./assets/screens/TiposDeRecursosScreen";
import TipoDeEspacio from "./assets/screens/TipoDeEspacio";
import CuentaAdminScreen from "./assets/screens/CuentaAdminScreen";
import CodigoDeVerificacion from "./assets/screens/CodigoDeVerificacionScreen";
import RestablecerContrasenaScreen from "./assets/screens/RestablecerContrasenaScreen";


function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/AdminPrincipal" element={<AdminPrincipal />} />
      <Route path="/Recursos" element={<RecursosScreenAdmin />} />
      <Route path="/InventariosAdmin" element={<InventariosAdmin />} />
      <Route path="/OlvidarContrasena" element={<OlvidarContrasena />} />
      <Route path="/EdificiosScreen" element={<EdificiosScreen/>} />
      <Route path="/ResponsablesScreen" element={<ResponsablesScreen/>} />
      <Route path="/UsuariosScreen" element={<UsuariosScreen/>} />
      <Route path="/TiposDeRecursos" element={<TiposDeRecursosScreen/>} />
      <Route path="/TipoDeEspacio" element={<TipoDeEspacio/>} />
      <Route path="/Cuenta" element={<CuentaAdminScreen/>} />
      <Route path="/codigo" element={<CodigoDeVerificacion/>} />
      <Route path="/restablecer" element={<RestablecerContrasenaScreen/>} />
    </Routes>
  );
}

export default App;