import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";

function RecursosScreenAdmin() {
  const [data, setData] = useState([
    {
      codigo: "ffff0_1",
      nombre: "Silla",
      descripcion: "Te puedes sentar",
      marca: "Sony",
      modelo: "Modelo",
      numeroSerie: "Sony",
      tipoRecurso: "Electrónico",
      edificio: "D1",
      espacio: "Taller pesado",
    },
    {
      codigo: "ffff0_2",
      nombre: "Escritorio",
      descripcion: "Colocar tus cosas",
      marca: "Sony",
      modelo: "Modelo",
      numeroSerie: "Sony",
      tipoRecurso: "Mesa",
      edificio: "D1",
      espacio: "Academia de idiomas",
    },
  ]);

  const [selectedResource, setSelectedResource] = useState(null);
  const [newResource, setNewResource] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    tipoRecurso: "",
    edificio: "",
    espacio: "",
  });

  const handleEditClick = (resource) => {
    setSelectedResource({ ...resource });
  };

  const handleAddClick = () => {
    setNewResource({
      codigo: "",
      nombre: "",
      descripcion: "",
      marca: "",
      modelo: "",
      numeroSerie: "",
      tipoRecurso: "",
      edificio: "",
      espacio: "",
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
        item.codigo === selectedResource.codigo ? selectedResource : item
      )
    );
    setSelectedResource(null);
  };

  const handleAddResource = () => {
    setData((prevData) => [...prevData, newResource]);
    setNewResource({
      codigo: "",
      nombre: "",
      descripcion: "",
      marca: "",
      modelo: "",
      numeroSerie: "",
      tipoRecurso: "",
      edificio: "",
      espacio: "",
    });
  };

  const handleDelete = (codigo) => {
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este recurso?");
    if (confirmDelete) {
      setData((prevData) => prevData.filter((item) => item.codigo !== codigo));
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
              <th>Espacio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.marca}</td>
                <td>{item.modelo}</td>
                <td>{item.numeroSerie}</td>
                <td>{item.tipoRecurso}</td>
                <td>{item.edificio}</td>
                <td>{item.espacio}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(item)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.codigo)}>Eliminar</button>
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
                        name="codigo"
                        value={selectedResource.codigo}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
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
                      <label className="form-label">Descripción</label>
                      <input
                        type="text"
                        className="form-control"
                        name="descripcion"
                        value={selectedResource.descripcion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Marca</label>
                      <input
                        type="text"
                        className="form-control"
                        name="marca"
                        value={selectedResource.marca}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Modelo</label>
                      <input
                        type="text"
                        className="form-control"
                        name="modelo"
                        value={selectedResource.modelo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Número de Serie</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroSerie"
                        value={selectedResource.numeroSerie}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Recurso</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tipoRecurso"
                        value={selectedResource.tipoRecurso}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Edificio</label>
                      <input
                        type="text"
                        className="form-control"
                        name="edificio"
                        value={selectedResource.edificio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Espacio</label>
                      <input
                        type="text"
                        className="form-control"
                        name="espacio"
                        value={selectedResource.espacio}
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
                      name="codigo"
                      value={newResource.codigo}
                      onChange={handleChange}
                    />
                  </div>
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
                    <label className="form-label">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="descripcion"
                      value={newResource.descripcion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      name="marca"
                      value={newResource.marca}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="modelo"
                      value={newResource.modelo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Número de Serie</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numeroSerie"
                      value={newResource.numeroSerie}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Recurso</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tipoRecurso"
                      value={newResource.tipoRecurso}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Edificio</label>
                    <input
                      type="text"
                      className="form-control"
                      name="edificio"
                      value={newResource.edificio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Espacio</label>
                    <input
                      type="text"
                      className="form-control"
                      name="espacio"
                      value={newResource.espacio}
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