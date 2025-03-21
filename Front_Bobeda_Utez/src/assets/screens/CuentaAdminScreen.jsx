import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";
import "./UsuariosScreenCss.css";

export default function CuentaAdminScreen() {
    const [nombre, setNombre] = useState("Michelle");
    const [apellidos, setApellidos] = useState("Martinez");
    const [correo, setCorreo] = useState("20233tn214@utez.edu.mx");
    const [contraseñaActual, setContraseñaActual] = useState("12345678"); 
    const [nuevaContraseña, setNuevaContraseña] = useState("");
    const [verificarContraseña, setVerificarContraseña] = useState("");
    const [error, setError] = useState("");

    const handleCambiarContraseña = (e) => {
        e.preventDefault();

        if (contraseñaActual !== "12345678") {
            setError("La contraseña actual es incorrecta.");
            return;
        }

        if (nuevaContraseña !== verificarContraseña) {
            setError("Las nuevas contraseñas no coinciden.");
            return;
        }

        if (nuevaContraseña.length < 8) {
            setError("La nueva contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setContraseñaActual(nuevaContraseña);
        setError("");
        alert("Contraseña cambiada exitosamente.");
        
        document.getElementById('cerrarModal').click();
    };

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
                                <Link className="nav-link active" aria-current="page" to="/AdminPrincipal">Inicio</Link>
                            </li>
                            <li className="nav-item1">
                                <Link className="nav-link active" aria-current="page" to="/">Cerrar sesión</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 pt-5">
                <div className="profile-section">
                    <h1>Bienvenido, Admin</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <img src="/img/PerfilAdmin.png" alt="Perfil Admin" className="img-fluid" style={{ borderRadius: '50%' }}/>
                            <button className="btn btn-primary btn-change-photo">Cambiar foto</button>
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre/s</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellidos"
                                    value={apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contraseñaActual" className="form-label">Contraseña Actual</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="contraseñaActual"
                                    value="********" 
                                    readOnly 
                                />
                            </div>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-change-password"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cambiarContraseñaModal"
                                >
                                    Cambiar contraseña
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="cambiarContraseñaModal" tabIndex="-1" aria-labelledby="cambiarContraseñaModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cambiarContraseñaModalLabel">Cambiar Contraseña</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCambiarContraseña}>
                                <div className="mb-3">
                                    <label htmlFor="contraseñaActualModal" className="form-label">Contraseña Actual</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="contraseñaActualModal"
                                        placeholder="Ingrese su contraseña actual"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="nuevaContraseña"
                                        value={nuevaContraseña}
                                        onChange={(e) => setNuevaContraseña(e.target.value)}
                                        placeholder="Ingrese la nueva contraseña"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="verificarContraseña" className="form-label">Verificar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="verificarContraseña"
                                        value={verificarContraseña}
                                        onChange={(e) => setVerificarContraseña(e.target.value)}
                                        placeholder="Confirme la nueva contraseña"
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="cerrarModal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}