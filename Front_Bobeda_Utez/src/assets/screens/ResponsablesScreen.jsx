import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from "sweetalert2";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipalCss.css";
import "./TipoDeEspacioCss.css";

export default function EspaciosScreen() {
  const [data, setData] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [newSpace, setNewSpace] = useState({
    name: "",
    typeOfSpace: "",
    building: "",
    user: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [responsibles, setResponsibles] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  const API_URL = "http://localhost:8080/api-BobedaUTEZ/space";
  const TYPES_API = "http://localhost:8080/api-BobedaUTEZ/type-of-space";
  const BUILDINGS_API = "http://localhost:8080/api-BobedaUTEZ/building";
  const USERS_API = "http://localhost:8080/api-BobedaUTEZ/user";
  const USER_TYPES_API = "http://localhost:8080/api-BobedaUTEZ/type-of-user";

  // Función para formatear el nombre completo del usuario
  const formatUserName = (user) => {
    if (!user) return "N/A";
    return `${user.firstName || ''} ${user.secondName || ''} ${user.surname || ''} ${user.lastName || ''}`.trim();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [spacesRes, typesRes, buildingsRes, usersRes, userTypesRes] = await Promise.all([
        fetch(API_URL),
        fetch(TYPES_API),
        fetch(BUILDINGS_API),
        fetch(USERS_API),
        fetch(USER_TYPES_API)
      ]);

      if (!spacesRes.ok || !typesRes.ok || !buildingsRes.ok || !usersRes.ok || !userTypesRes.ok) {
        throw new Error("Error al cargar los datos");
      }

      const spacesData = await spacesRes.json();
      const typesData = await typesRes.json();
      const buildingsData = await buildingsRes.json();
      const usersData = await usersRes.json();
      const userTypesData = await userTypesRes.json();

      setData(spacesData.data || []);
      setTypes(typesData.data || []);
      setBuildings(buildingsData.data || []);
      setUserTypes(userTypesData.data || []);

      // Encontrar el ID del tipo "Responsable"
      const responsableType = userTypesData.data?.find(
          type => type.name === "Responsable"
      );

      // Filtrar usuarios por tipo de usuario "Responsable"
      const filteredResponsibles = usersData.data?.filter(user => {
        // Caso 1: typeOfUser es un objeto con propiedad name
        if (user.typeOfUser?.name === "Responsable") {
          return true;
        }
        // Caso 2: typeOfUser es un string (ID)
        else if (typeof user.typeOfUser === "string") {
          return user.typeOfUser === responsableType?.id;
        }
        // Caso 3: typeOfUser es un objeto con propiedad _id
        else if (user.typeOfUser?._id) {
          return user.typeOfUser._id === responsableType?.id;
        }
        return false;
      }) || [];

      setResponsibles(filteredResponsibles);

    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Estados para controlar modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditClick = (space) => {
    setSelectedSpace({
      ...space,
      typeOfSpace: space.typeOfSpace?.id || space.typeOfSpace?._id || "",
      building: space.building?.id || space.building?._id || "",
      user: space.user?.id || space.user?._id || ""
    });
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setNewSpace({
      name: "",
      typeOfSpace: "",
      building: "",
      user: ""
    });
    setShowAddModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal && selectedSpace) {
      setSelectedSpace(prev => ({ ...prev, [name]: value }));
    } else {
      setNewSpace(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const spaceToUpdate = {
        ...selectedSpace,
        typeOfSpace: types.find(t => t.id === selectedSpace.typeOfSpace || t._id === selectedSpace.typeOfSpace),
        building: buildings.find(b => b.id === selectedSpace.building || b._id === selectedSpace.building),
        user: responsibles.find(u => u.id === selectedSpace.user || u._id === selectedSpace.user)
      };

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spaceToUpdate),
      });

      if (!response.ok) throw new Error(await response.text());

      await fetchData();
      setShowEditModal(false);
      Swal.fire("¡Éxito!", "Espacio actualizado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleAddSpace = async () => {
    try {
      const spaceToAdd = {
        ...newSpace,
        typeOfSpace: types.find(t => t.id === newSpace.typeOfSpace || t._id === newSpace.typeOfSpace),
        building: buildings.find(b => b.id === newSpace.building || b._id === newSpace.building),
        user: responsibles.find(u => u.id === newSpace.user || u._id === newSpace.user)
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spaceToAdd),
      });

      if (!response.ok) throw new Error(await response.text());

      await fetchData();
      setShowAddModal(false);
      Swal.fire("¡Éxito!", "Espacio creado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error(await response.text());

        await fetchData();
        Swal.fire("Eliminado", "El espacio ha sido eliminado", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const filteredData = data.filter(space =>
      (space.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (space.typeOfSpace?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (space.building?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatUserName(space.user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
  );

  if (error) return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button className="btn btn-primary mt-2" onClick={fetchData}>
            Reintentar
          </button>
        </div>
      </div>
  );

  return (
      <div>
        {/* Navbar */}
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
                    <li><Link className="dropdown-item" to="/TiposDeRecursos">Tipos de recursos</Link></li>
                    <li><Link className="dropdown-item" to="/ResponsablesScreen">Responsables</Link></li>
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

        {/* Barra de búsqueda */}
        <div className="search-container mt-5 pt-4">
          <input
              className="form-control"
              type="search"
              placeholder="Buscar🔎"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Encabezado y botón */}
        <div className="header-container2">
          <h2 className="mb-3">Espacios</h2>
          <button className="btn1 btn-success" onClick={handleAddClick}>
            AÑADIR NUEVO ESPACIO
          </button>
        </div>

        {/* Tabla de datos */}
        <div className="container mt-3">
          {filteredData.length === 0 ? (
              <div className="alert alert-info">
                {searchTerm
                    ? `No se encontraron resultados para "${searchTerm}"`
                    : "No hay espacios registrados"}
              </div>
          ) : (
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo de espacio</th>
                  <th>Edificio</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((space) => (
                    <tr key={space.id || space._id}>
                      <td>{space.name}</td>
                      <td>{space.typeOfSpace?.name || "N/A"}</td>
                      <td>{space.building?.name || "N/A"}</td>
                      <td>{formatUserName(space.user)}</td>
                      <td>
                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditClick(space)}
                        >
                          Editar
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(space.id || space._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>

        {/* Modal de Edición */}
        {showEditModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar Espacio</h5>
                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={selectedSpace?.name || ""}
                            onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Tipo de espacio</label>
                        <select
                            className="form-select"
                            name="typeOfSpace"
                            value={selectedSpace?.typeOfSpace || ""}
                            onChange={handleChange}
                        >
                          <option value="">Seleccione un tipo</option>
                          {types.map(type => (
                              <option key={type.id || type._id} value={type.id || type._id}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Edificio</label>
                        <select
                            className="form-select"
                            name="building"
                            value={selectedSpace?.building || ""}
                            onChange={handleChange}
                        >
                          <option value="">Seleccione un edificio</option>
                          {buildings.map(building => (
                              <option key={building.id || building._id} value={building.id || building._id}>{building.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Responsable</label>
                        <select
                            className="form-select"
                            name="user"
                            value={selectedSpace?.user || ""}
                            onChange={handleChange}
                        >
                          <option value="">Seleccione un responsable</option>
                          {responsibles.map(responsible => (
                              <option key={responsible.id || responsible._id} value={responsible.id || responsible._id}>
                                {formatUserName(responsible)}
                              </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowEditModal(false)}
                    >
                      Cancelar
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

        {/* Modal de Agregar */}
        {showAddModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Agregar Espacio</h5>
                    <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={newSpace.name}
                            onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Tipo de espacio</label>
                        <select
                            className="form-select"
                            name="typeOfSpace"
                            value={newSpace.typeOfSpace}
                            onChange={handleChange}
                        >
                          <option value="">Seleccione un tipo</option>
                          {types.map(type => (
                              <option key={type.id || type._id} value={type.id || type._id}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Edificio</label>
                        <select
                            className="form-select"
                            name="building"
                            value={newSpace.building}
                            onChange={handleChange}
                        >
                          <option value="">Seleccione un edificio</option>
                          {buildings.map(building => (
                              <option key={building.id || building._id} value={building.id || building._id}>{building.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Responsable</label>
                        <select
                            className="form-select"
                            name="user"
                            value={newSpace.user}
                            onChange={handleChange}
                        >
                          <option value="">Seleccione un responsable</option>
                          {responsibles.map(responsible => (
                              <option key={responsible.id || responsible._id} value={responsible.id || responsible._id}>
                                {formatUserName(responsible)}
                              </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddSpace}
                    >
                      Crear Espacio
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}