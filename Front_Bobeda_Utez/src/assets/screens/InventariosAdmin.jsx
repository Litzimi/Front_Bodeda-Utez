
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./InventariosAdmin.css";

const API_URL = "http://localhost:8080/api-BobedaUTEZ/inventary-raised";

export default function InventariosAdmin() {
    const navigate = useNavigate();
    const [inventarios, setInventarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarios = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                setInventarios(response.data.data || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching inventories:", err);
                setError("No se pudo conectar con el servidor");
                // Datos de ejemplo como fallback
                setInventarios([
                    {
                        id: "1",
                        date: "2023-05-15T00:00:00",
                        building: { name: "D1" },
                        typeOfSpace: { name: "Aula" }
                    },
                    {
                        id: "2",
                        date: "2023-05-16T00:00:00",
                        building: { name: "D4" },
                        typeOfSpace: { name: "Laboratorio" }
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarios();
    }, []);

    const formatFecha = (fechaStr) => {
        if (!fechaStr) return 'Sin fecha';
        const [year, month, day] = fechaStr.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    const handleViewDetails = (id) => {
        navigate(`/inventarios/${id}`);
    };

    const handleDownloadPDF = (id) => {
        console.log("Descargando PDF para inventario:", id);
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
                                    <li><Link className="dropdown-item" to="/ResponsablesScreen">Espacios</Link></li>
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

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="container mt-5">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Edificio</th>
                        <th>Espacio</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventarios.map((item) => (
                        <tr key={item.id}>
                            <td>{formatFecha(item.date)}</td>
                            <td>{item.building?.name || 'Sin edificio'}</td>
                            <td>{item.typeOfSpace?.name || 'Sin espacio'}</td>
                            <td>
                                <button
                                    className="btn-custom btn-warning btn-custom-ver"
                                    onClick={() => handleViewDetails(item.id)}  // Usamos la función que ya tienes definida
                                >
                                    Ver 👁️
                                </button>
                                <button
                                    className="btn-custom btn-danger btn-custom-descargar"
                                    onClick={() => handleDownloadPDF(item.id)}
                                >
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
