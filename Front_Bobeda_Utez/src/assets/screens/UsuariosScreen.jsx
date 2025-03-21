import React, { useState, useNavigate } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";
import "./UsuariosScreenCss.css";

export default function UsuariosScreen() {

  const [data, setData] = useState([
    {
      nombre: "Nathan",
      correo: "20233TN203@UTEZ.EDU.MX",
      tipoUser: "Admin",
    },
    {
      nombre: "Michelle",
      correo: "20233TN214@UTEZ.EDU.MX",
      tipoUser: "Admin",
    },
  ]);

  const [selectedResource, setSelectedResource] = useState(null);
  const [newResource, setNewResource] = useState({
    nombre: "",
    correo: "",
    tipoUser: "",
  });

  const handleEditClick = (resource) => {
    setSelectedResource({ ...resource });
  };

  const handleAddClick = () => {
    setNewResource({
      nombre: "",
      correo: "",
      tipoUser: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedResource) {
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

  const handleSaveChanges = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.nombre === selectedResource.nombre ? selectedResource : item
      )
    );
    setSelectedResource(null);
  };

  const handleAddResource = () => {
    setData((prevData) => [...prevData, newResource]);
    setNewResource({
      nombre: "",
      correo: "",
      tipoUser: "",
    });
  };

  const handleDelete = (nombre) => {
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este usuario?");
    if (confirmDelete) {
      setData((prevData) => prevData.filter((item) => item.nombre !== nombre));
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
                  <li><Link className="dropdown-item" to="/EdificiosScreen">Edificios</Link></li>
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

      <div className="header-container">
        <h2 className="mb-3">Usuarios</h2>
        <button
          className="btn1 btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
          onClick={handleAddClick}
        >
          AÑADIR NUEVO USUARIO
        </button>
      </div>

      <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Tipo de Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.correo}</td>
                <td>{item.tipoUser}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.nombre)}
                  >
                    Eliminar
                  </button>
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
                  <h5 className="modal-title">Editar Usuario</h5>
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
                        name="nombre"
                        value={selectedResource.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo Electrónico</label>
                      <input
                        type="text"
                        className="form-control"
                        name="correo"
                        value={selectedResource.correo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Usuario</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tipoUser"
                        value={selectedResource.tipoUser}
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

        <div className="modal fade" id="addModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Usuario</h5>
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
                      name="nombre"
                      value={newResource.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      type="text"
                      className="form-control"
                      name="correo"
                      value={newResource.correo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tipoUser"
                      value={newResource.tipoUser}
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
                  onClick={handleAddResource}
                >
                  Agregar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}