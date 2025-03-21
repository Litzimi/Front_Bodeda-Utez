import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./InventariosAdmin.css";
import "./AdminPrincipal";

function InventariosAdmin() {
    let navigate = useNavigate();

    const [data, setData] = useState([
        {
            codigo: "ffff0_1",
            fecha: "Silla",
            edificio: "D1",
        },
        {
            codigo: "ffff0_2",
            fecha: "Silla",
            edificio: "D1",
        },
    ]);

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
                                    <li><Link className="dropdown-item" to="TiposDeRecursos">Tipos de recursos</Link></li>
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
                                <Link className="nav-link active" aria-current="page" to="/AdminPrincipal">Inicio</Link>
                            </li>
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
            <div className="search-container mt-5 pt-4">
                <form className="d-flex" role="search">
                    <input className="form-control" type="search" placeholder="Buscar🔎" />
                </form>
            </div>
            <h2>Inventarios Levantados</h2>

            <div className="container mt-5">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Fecha</th>
                            <th>Edificio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.codigo}</td>
                                <td>{item.fecha}</td>
                                <td>{item.edificio}</td>
                                <td>
                                    <button className="btn-custom btn-warning btn-custom-ver">
                                        Ver 👁️
                                    </button>
                                    <button className="btn-custom btn-danger btn-custom-descargar">
                                        Descargar PDF 📄
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InventariosAdmin;