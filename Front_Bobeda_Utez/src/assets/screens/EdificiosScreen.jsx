import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);

      // Manejar diferentes estructuras de respuesta
      let buildingsData = [];

      if (response.data && Array.isArray(response.data.data)) {
        buildingsData = response.data.data;
      } else if (Array.isArray(response.data)) {
        buildingsData = response.data;
      } else if (response.data && typeof response.data === 'object') {
        buildingsData = Object.values(response.data);
      }

      // Filtrar solo edificios con ID válido (ObjectId o string)
      const validBuildings = buildingsData.filter(building =>
          building._id || building.id
      );

      setBuildings(validBuildings);
    } catch (err) {
      console.error("Error al obtener edificios:", err);
      await Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los edificios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      setBuildings([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBuildings = buildings.filter(building =>
      building.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (building) => {
    const id = building._id || building.id;
    if (id) {
      setSelectedBuilding({ ...building });
      setShowEditModal(true);
    }
  };

  const handleAddClick = () => {
    setNewBuilding({ name: "" });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
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
      const id = selectedBuilding?._id || selectedBuilding?.id;
      if (!id) {
        await Swal.fire({
          title: 'Error',
          text: 'ID de edificio no válido',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      if (!selectedBuilding?.name?.trim()) {
        await Swal.fire({
          title: 'Campo requerido',
          text: 'El nombre del edificio es obligatorio',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      await axios.put(`${API_URL}`, selectedBuilding);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Edificio actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      await fetchBuildings();
      handleCloseModal();
    } catch (err) {
      console.error("Error al actualizar:", err);
      await Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Error al actualizar el edificio',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleAddBuilding = async () => {
    try {
      if (!newBuilding.name?.trim()) {
        await Swal.fire({
          title: 'Campo requerido',
          text: 'El nombre del edificio es obligatorio',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      await axios.post(API_URL, newBuilding);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Edificio agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      await fetchBuildings();
      setNewBuilding({ name: "" });
      handleCloseModal();
    } catch (err) {
      console.error("Error al agregar:", err);
      await Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Error al agregar el edificio',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      await Swal.fire({
        title: 'Error',
        text: 'ID de edificio no válido',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${API_URL}/${id}`);

        if (response.status === 200) {
          await Swal.fire(
              '¡Eliminado!',
              'El edificio ha sido eliminado.',
              'success'
          );
          await fetchBuildings();
        } else {
          throw new Error('Respuesta inesperada del servidor');
        }
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      let errorMessage = 'No se pudo eliminar el edificio';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      await Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
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
                  <Link className="nav-link active" aria-current="page" to="/InventariosAdmin">
                    Ver inventarios
                  </Link>
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
                    <li><Link className="dropdown-item" to="/Recursos">Recursos</Link></li>
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
            <input
                className="form-control"
                type="search"
                placeholder="Buscar🔎"
                name="search"
                value={searchTerm}
                onChange={handleChange}
            />
          </form>
        </div>

        <div className="header-container2">
          <h2 className="mb-3">Edificios</h2>
          <button
              className="btn1 btn-success"
              onClick={handleAddClick}
          >
            AÑADIR NUEVO EDIFICIO
          </button>
        </div>

        <div className="container mt-5">
          {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
          ) : (
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredBuildings.length > 0 ? (
                    filteredBuildings.map((building) => (
                        <tr key={building._id || building.id}>
                          <td>{building.name}</td>
                          <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEditClick(building)}
                            >
                              Editar
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(building._id || building.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        {buildings.length === 0 ? "No hay edificios registrados" : "No se encontraron resultados"}
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
          )}

          {/* Modal de edición */}
          {selectedBuilding && (
              <div
                  className={`modal fade ${showEditModal ? 'show' : ''}`}
                  style={{ display: showEditModal ? 'block' : 'none' }}
                  tabIndex="-1"
                  aria-labelledby="editModalLabel"
                  aria-modal="true"
                  role="dialog"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="editModalLabel">Editar Edificio</h5>
                      <button
                          type="button"
                          className="btn-close"
                          onClick={handleCloseModal}
                          aria-label="Close"
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
                              value={selectedBuilding.name || ''}
                              onChange={handleChange}
                              required
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseModal}
                      >
                        Cerrar
                      </button>
                      <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleSaveChanges}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* Modal de agregar */}
          <div
              className={`modal fade ${showAddModal ? 'show' : ''}`}
              style={{ display: showAddModal ? 'block' : 'none' }}
              tabIndex="-1"
              aria-labelledby="addModalLabel"
              aria-modal="true"
              role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addModalLabel">Agregar Nuevo Edificio</h5>
                  <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                      aria-label="Close"
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
                          value={newBuilding.name || ''}
                          onChange={handleChange}
                          required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                  <button
                      type="button"
                      className="btn btn-primary"
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