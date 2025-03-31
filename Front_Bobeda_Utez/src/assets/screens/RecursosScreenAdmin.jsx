import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";

function RecursosScreenAdmin() {
  const [data, setData] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [newResource, setNewResource] = useState({
    // file: null,
    code: "",
    name: "",
    description: "",
    brand: "",
    model: "",
    serialNumber: "",
    // typeOfResource: null,
    // building: null,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (selectedResource) {
      setTimeout(() => {
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
      }, 100);
    }
  }, [selectedResource]);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api-BobedaUTEZ/resource");
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("La respuesta no contiene un array:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      setData([]);
    }
  };

  const handleEditClick = (resource) => {
    setSelectedResource({ ...resource });
  };

  const handleAddClick = () => {
    setSelectedResource(null);
    setNewResource({
      // file: null,
      code: "",
      name: "",
      description: "",
      brand: "",
      model: "",
      serialNumber: "",
      // typeOfResource: null,
      // building: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedResource !== null) {
      setSelectedResource((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewResource((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put("http://localhost:8080/api-BobedaUTEZ/resource", selectedResource);
      fetchResources();
      setSelectedResource(null);
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  const handleAddResource = async () => {
    try {
      const formData = new FormData();
      // Si tienes un archivo, adjúntalo también
      // formData.append("file", null);
      formData.append("code", newResource.code);
      formData.append("name", newResource.name);
      formData.append("description", newResource.description);
      formData.append("brand", newResource.brand);
      formData.append("model", newResource.model);
      formData.append("serialNumber", newResource.serialNumber);
      // formData.append("typeOfResource", JSON.stringify(newResource.typeOfResource)); // Serializar si es un objeto
      // formData.append("building", JSON.stringify(newResource.building)); // Serializar si es un objeto
  
      await axios.post("http://localhost:8080/api-BobedaUTEZ/resource", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      fetchResources(); // Actualiza los recursos
      setNewResource({
        // file: null,
        code: "",
        name: "",
        description: "",
        brand: "",
        model: "",
        serialNumber: "",
        // typeOfResource: null,
        // building: null,
      });
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
      } else {
        console.error("Error al conectar con el servidor:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este recurso?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api-BobedaUTEZ/resource/${id}`);
        fetchResources();
      } catch (error) {
        console.error("Error deleting resource:", error);
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

      <div className="header-container">
        <h2 className="mb-3">Recursos</h2>
        <button className="btn1 btn-success" data-bs-toggle="modal" data-bs-target="#addModal" onClick={handleAddClick}>
          AÑADIR NUEVO RECURSO
        </button>
      </div>

      <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>No. de serie</th>
              <th>Tipo de recurso</th>
              <th>Edificio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.serialNumber}</td>
                <td>{item.typeOfResource?.name}</td>
                <td>{item.building?.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(item)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedResource && (
          <div className="modal fade" id="editModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Recurso</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Código</label>
                      <input
                        type="text"
                        className="form-control"
                        name="code"
                        value={selectedResource.code}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={selectedResource.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={selectedResource.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Marca</label>
                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={selectedResource.brand}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Modelo</label>
                      <input
                        type="text"
                        className="form-control"
                        name="model"
                        value={selectedResource.model}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Número de Serie</label>
                      <input
                        type="text"
                        className="form-control"
                        name="serialNumber"
                        value={selectedResource.serialNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="modal fade" id="addModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Recurso</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Código</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      value={newResource.code}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newResource.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={newResource.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={newResource.brand}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      value={newResource.model}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Número de Serie</label>
                    <input
                      type="text"
                      className="form-control"
                      name="serialNumber"
                      value={newResource.serialNumber}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddResource}>
                  Agregar Recurso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecursosScreenAdmin;