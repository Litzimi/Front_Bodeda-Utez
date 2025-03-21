import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminPrincipalCss.css";

function AdminPrincipal() {
  let navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="\InventariosAdmin">
                  Ver inventarios
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Ver Catálogos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/Recursos">
                      Recursos
                    </Link>
                  </li>
                  <li><Link className="dropdown-item" to="/EdificiosScreen">Edificios</Link></li>
                  <li><Link className="dropdown-item" to="/UsuariosScreen">Usuarios</Link></li>
                  <li><Link className="dropdown-item" to="/TiposDeRecursos">Tipos de recursos</Link></li>
                  <li><Link className="dropdown-item" to="/ResponsablesScreen">Responsables</Link></li>
                  <li><Link className="dropdown-item" to="/TipoDeEspacio">Tipo de espacio</Link></li>
                  <li><Link className="dropdown-item" to="/InventariosAdmin">
                      Inventarios levantados
                    </Link></li>
                </ul>
              </li>
              <img
                className="imagenNav"
                src="/img/Logo_Bobeda_Cajas.png"
                style={{ width: 70, height: 70 }}
                alt="Logo"
              />
              <li className="nav-item1">
                <Link className="nav-link active" aria-current="page" to="/cuenta">Cuenta</Link>
              </li>
              <li className="nav-item1">
                <Link className="nav-link active" aria-current="page" to="/">Cerrar sesión</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="cuerpo">
        <div className="card" style={{ maxWidth: "540px", backgroundColor: "#D1FFD3" }} onClick={() => navigate("/Recursos")}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="/img/CajaArchivosAdmin.png"
                className="img-fluid rounded-start"
                alt="Caja de archivos"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Recursos</h5>
                <p>250</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: "540px" }} onClick={() => navigate("/EdificiosScreen")}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="img/EdificioIconAdmin.png"
                className="img-fluid rounded-start"
                alt="Caja de archivos"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Edificios</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: "540px" }} onClick={() => navigate("/TipoDeEspacio")}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="img/EspaciosIconAdmin.png"
                className="img-fluid rounded-start"
                alt="Caja de archivos"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Espacios</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: "540px", backgroundColor: "#D1FFD3" }} onClick={() => navigate("/ResponsablesScreen")}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="/img/UserIconAdmin.png"
                className="img-fluid rounded-start"
                alt="Caja de archivos"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Responsables</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPrincipal;