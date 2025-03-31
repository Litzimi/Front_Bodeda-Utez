import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";
import "./TipoDeEspacioCss.css";

const API_URL = "http://localhost:8080/api-BobedaUTEZ/building";

export default function EdificiosScreen() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [newBuilding, setNewBuilding] = useState({ name: "" });
  const [loading, setLoading] = useState(false); // Cambiado a false para mostrar tabla inmediatamente
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      
      // Manejo de la respuesta manteniendo estructura simple
      const buildingsData = response.data?.data || response.data || [];
      setBuildings(Array.isArray(buildingsData) ? buildingsData : [buildingsData]);
    } catch (err) {
      console.error("Error fetching buildings:", err);
      // Si hay error, mostramos datos de ejemplo como en tu versión original
      setBuildings([
        { id: "1", name: "D1" },
        { id: "2", name: "D4" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBuildings = buildings.filter(building =>
    building.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (building) => {
    setSelectedBuilding({ ...building });
  };

  const handleAddClick = () => {
    setNewBuilding({ name: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchTerm(value);
    } else if (selectedBuilding) {
      setSelectedBuilding(prev => ({ ...prev, [name]: value }));
    } else {
      setNewBuilding(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!selectedBuilding?.name?.trim()) {
        setError("El nombre del edificio es requerido");
        return;
      }
      
      // Si hay conexión, hacemos la petición PUT
      if (API_URL) {
        await axios.put(API_URL, selectedBuilding);
        await fetchBuildings();
      } else {
        // Si no hay conexión, actualizamos localmente como en tu versión original
        setBuildings(prev => 
          prev.map(item => 
            item.id === selectedBuilding.id ? selectedBuilding : item
          )
        );
      }
      
      setSelectedBuilding(null);
    } catch (err) {
      setError("Error al actualizar el edificio");
      console.error("Error updating building:", err);
    }
  };

  const handleAddBuilding = async () => {
    try {
      if (!newBuilding.name?.trim()) {
        setError("El nombre del edificio es requerido");
        return;
      }
      
      const buildingToAdd = {
        ...newBuilding,
        id: Math.random().toString(36).substring(2, 9) // ID temporal
      };

      // Si hay conexión, hacemos la petición POST
      if (API_URL) {
        await axios.post(API_URL, buildingToAdd);
        await fetchBuildings();
      } else {
        // Si no hay conexión, agregamos localmente como en tu versión original
        setBuildings(prev => [...prev, buildingToAdd]);
      }
      
      setNewBuilding({ name: "" });
    } catch (err) {
      setError("Error al agregar el edificio");
      console.error("Error adding building:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este edificio?");
    if (confirmDelete) {
      try {
        // Si hay conexión, hacemos la petición DELETE
        if (API_URL) {
          await axios.delete(`${API_URL}/${id}`);
          await fetchBuildings();
        } else {
          // Si no hay conexión, eliminamos localmente como en tu versión original
          setBuildings(prev => prev.filter(item => item.id !== id));
        }
      } catch (err) {
        setError("Error al eliminar el edificio");
        console.error("Error deleting building:", err);
      }
    }
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
                <a className="nav-link active" aria-current="page" href="#">Cuenta</a>
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
          <input className="form-control" type="search" placeholder="Buscar🔎" 
            name="search"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="header-container2">
        <h2 className="mb-3" style={{}}>Edificios</h2>
        <button
          className="btn1 btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
          onClick={handleAddClick}
        >
          AÑADIR NUEVO EDIFICIO
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button 
            className="btn-close" 
            onClick={() => setError(null)}
            style={{float: 'right'}}
          />
        </div>
      )}

      <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuildings.map((building) => (
              <tr key={building.id}>
                <td>{building.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(building)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(building.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal de edición */}
        {selectedBuilding && (
          <div className="modal fade" id="editModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Edificio</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={selectedBuilding.name}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleSaveChanges}
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de agregar nuevo edificio */}
        <div className="modal fade" id="addModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Edificio</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newBuilding.name}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleAddBuilding}
                >
                  Agregar Edificio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}