import React, { useState, useNavigate } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";
import "./TipoDeEspacioCss.css";


export default function TipoDeEspacio() {

  
    const [data, setData] = useState([
      {
        nombre: "CC10",
        docencia: "CECADEC",
      },
      {
        nombre: "CC11",
        docencia: "D4",
      },
    ]);
  
    const [selectedResource, setSelectedResource] = useState(null);
    const [newResource, setNewResource] = useState({
      nombre: "",
      docencia: "",
    });
  
    const handleEditClick = (resource) => {
      setSelectedResource({ ...resource });
    };
  
    const handleAddClick = () => {
      setNewResource({
        nombre: "",
        docencia: "",
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
        docencia: "",
      });
    };
  
    const handleDelete = (nombre) => {
      const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este espacio?");
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
                  <li><Link className="dropdown-item" to="/UsuariosScreen">Usuarios</Link></li>
                  <li><Link className="dropdown-item" to="/TiposDeRecursos">Tipos de recursos</Link></li>
                  <li><Link className="dropdown-item" to="/ResponsablesScreen">Responsables</Link></li>
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

      <div className="header-container2">
        <h2 className="mb-3" style={{}}>Tipos de espacios</h2>
        <button
          className="btn1 btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
          onClick={handleAddClick}
        >
          AÑADIR NUEVO TIPO DE ESPACIO
        </button>
      </div>

    <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Docencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.docencia}</td>
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
                  <h5 className="modal-title">Editar Espacio</h5>
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
                      <label className="form-label">Docencia</label>
                      <input
                        type="text"
                        className="form-control"
                        name="docencia"
                        value={selectedResource.docencia}
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
                    <label className="form-label">Docencia</label>
                    <input
                      type="text"
                      className="form-control"
                      name="docencia"
                      value={newResource.docencia}
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
  )
}
