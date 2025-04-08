import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";
import "./TipoDeEspacioCss.css";
import "./TiposDeRecursosScreenCss.css";

const API_URL = "http://localhost:8080/api-BobedaUTEZ/type-of-resource";

export default function TiposDeRecursosScreen() {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [newResourceName, setNewResourceName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);

      let resourcesData = [];
      if (Array.isArray(response.data)) {
        resourcesData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        resourcesData = response.data.data;
      } else {
        resourcesData = Object.values(response.data || {});
      }

      setResources(resourcesData);
      setError(null);
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Error al cargar los recursos");
      showErrorAlert("Error al cargar los recursos");
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  // SweetAlert Helper Functions
  const showSuccessAlert = (message) => {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#28a745',
      timer: 2000
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#dc3545'
    });
  };

  const showConfirmDialog = (title, text, confirmCallback, confirmButtonText = 'Sí, eliminar', confirmButtonColor = '#dc3545') => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  };

  const handleEditClick = (resource) => {
    setSelectedResource({ ...resource });
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setNewResourceName("");
    setShowAddModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedResource(prev => ({ ...prev, [name]: value }));
  };

  const handleAddInputChange = (e) => {
    setNewResourceName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const validateAndSaveChanges = async () => {
    // Validación básica
    if (!selectedResource?.name || selectedResource.name.trim() === "") {
      showErrorAlert("El nombre del recurso no puede estar vacío");
      return;
    }

    showConfirmDialog(
        "¿Estás seguro?",
        "¿Deseas guardar los cambios realizados en este recurso?",
        async () => {
          try {
            await axios.put(API_URL, selectedResource);
            await fetchResources();
            setShowEditModal(false);
            setSelectedResource(null);
            showSuccessAlert("Recurso actualizado con éxito");
          } catch (err) {
            console.error("Error updating resource:", err);
            showErrorAlert("Error al actualizar el recurso");
          }
        },
        "Sí, guardar cambios",
        "#0d6efd"
    );
  };

  const validateAndAddResource = async () => {
    // Validación básica
    if (!newResourceName || newResourceName.trim() === "") {
      showErrorAlert("El nombre del recurso no puede estar vacío");
      return;
    }

    showConfirmDialog(
        "¿Estás seguro?",
        "¿Deseas agregar este nuevo recurso?",
        async () => {
          try {
            await axios.post(API_URL, { name: newResourceName });
            await fetchResources();
            setShowAddModal(false);
            setNewResourceName("");
            showSuccessAlert("Recurso agregado con éxito");
          } catch (err) {
            console.error("Error adding resource:", err);
            showErrorAlert("Error al agregar el recurso");
          }
        },
        "Sí, agregar recurso",
        "#0d6efd"
    );
  };

  const handleDelete = async (id) => {
    showConfirmDialog(
        "¿Estás seguro?",
        "¿Deseas eliminar este recurso? Esta acción no se puede deshacer.",
        async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchResources();
            showSuccessAlert("Recurso eliminado con éxito");
          } catch (err) {
            console.error("Error deleting resource:", err);
            showErrorAlert("Error al eliminar el recurso");
          }
        }
    );
  };

  const filteredResources = resources.filter(resource =>
      resource.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="container mt-5 pt-5">Cargando...</div>;
  if (error) return <div className="container mt-5 pt-5 alert alert-danger">{error}</div>;

  return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="\InventariosAdmin">Ver inventarios</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    Ver Catálogos
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/Recursos">Recursos</Link></li>
                    <li><Link className="dropdown-item" to="/EdificiosScreen">Edificios</Link></li>
                    <li><Link className="dropdown-item" to="/UsuariosScreen">Usuarios</Link></li>
                    <li><Link className="dropdown-item" to="/ResponsablesScreen">Espacio</Link></li>
                    <li><Link className="dropdown-item" to="/TipoDeEspacio">Tipo de espacio</Link></li>
                    <li><Link className="dropdown-item" to="/InventariosAdmin">Inventarios levantados</Link></li>
                  </ul>
                </li>
                <img className="imagenNav" src="/img/Logo_Bobeda_Cajas.png" style={{ width: 70, height: 70 }} alt="Logo" />
                <li className="nav-item1">
                  <Link className="nav-link active" to="/AdminPrincipal">Inicio</Link>
                </li>
                <li className="nav-item1">
                  <Link className="nav-link active" to="/cuenta">Cuenta</Link>
                </li>
                <li className="nav-item1">
                  <Link className="nav-link active" to="/">Cerrar sesión</Link>
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
                value={searchTerm}
                onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className="header-container2">
          <h2 className="mb-3">Tipos de Recursos</h2>
          <button
              className="btn1 btn-success"
              onClick={handleAddClick}
          >
            AÑADIR NUEVO RECURSO
          </button>
        </div>

        <div className="container mt-5">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {filteredResources.map((item) => (
                <tr key={item._id || item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button
                        className="btn-narrow btn-warning-narrow"
                        onClick={() => handleEditClick(item)}
                    >
                      Editar
                    </button>
                    <button
                        className="btn-narrow btn-danger-narrow"
                        onClick={() => handleDelete(item._id || item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Modal de Edición */}
          {showEditModal && (
              <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Recurso</h5>
                      <button
                          type="button"
                          className="btn-close"
                          onClick={() => {
                            setShowEditModal(false);
                            setSelectedResource(null);
                          }}
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
                              value={selectedResource?.name || ""}
                              onChange={handleEditInputChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowEditModal(false);
                            setSelectedResource(null);
                          }}
                      >
                        Cerrar
                      </button>
                      <button
                          type="button"
                          className="btn btn-primary"
                          onClick={validateAndSaveChanges}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* Modal de Adición */}
          {showAddModal && (
              <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Agregar Nuevo Recurso</h5>
                      <button
                          type="button"
                          className="btn-close"
                          onClick={() => {
                            setShowAddModal(false);
                            setNewResourceName("");
                          }}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Nombre</label>
                          <input
                              type="text"
                              className="form-control"
                              value={newResourceName}
                              onChange={handleAddInputChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowAddModal(false);
                            setNewResourceName("");
                          }}
                      >
                        Cerrar
                      </button>
                      <button
                          type="button"
                          className="btn btn-primary"
                          onClick={validateAndAddResource}
                      >
                        Agregar Recurso
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}