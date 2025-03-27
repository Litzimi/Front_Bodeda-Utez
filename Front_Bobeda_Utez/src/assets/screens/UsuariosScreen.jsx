import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./RecursosScreenAdmin.css";
import "./AdminPrincipal";
import "./UsuariosScreenCss.css";

const API_URL = "http://localhost:8080/api-BobedaUTEZ/user";
const TYPES_URL = "http://localhost:8080/api-BobedaUTEZ/type-of-user";

export default function UsuariosScreen() {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    secondName: "",
    surname: "",
    lastName: "",
    email: "",
    password: "defaultPassword",
    phoneNumber: "",
    typeOfUser: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchUserTypes();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTypes = async () => {
    try {
      const response = await axios.get(TYPES_URL);
      if (response.data && Array.isArray(response.data)) {
        setUserTypes(response.data);
        // Establecer el primer tipo como valor por defecto
        if (response.data.length > 0) {
          setNewUser(prev => ({ ...prev, typeOfUser: response.data[0] }));
        }
      }
    } catch (err) {
      console.error("Error al cargar tipos de usuario:", err);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser({ ...user });
  };

  const handleAddClick = () => {
    setNewUser({
      firstName: "",
      secondName: "",
      surname: "",
      lastName: "",
      email: "",
      password: "defaultPassword",
      phoneNumber: "",
      typeOfUser: userTypes.length > 0 ? userTypes[0] : null
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser(prev => ({ ...prev, [name]: value }));
    } else {
      setNewUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    const selectedType = userTypes.find(type => type._id === selectedTypeId);
    
    if (selectedUser) {
      setSelectedUser(prev => ({ ...prev, typeOfUser: selectedType }));
    } else {
      setNewUser(prev => ({ ...prev, typeOfUser: selectedType }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(API_URL, selectedUser);
      fetchUsers();
      setSelectedUser(null);
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert("Error al actualizar usuario: " + (err.response?.data?.message || err.message));
    }
  };

  const handleAddUser = async () => {
    try {
      // Validación básica
      if (!newUser.firstName || !newUser.surname || !newUser.email || !newUser.typeOfUser) {
        alert("Por favor complete todos los campos obligatorios");
        return;
      }

      await axios.post(API_URL, newUser);
      fetchUsers();
      setNewUser({
        firstName: "",
        secondName: "",
        surname: "",
        lastName: "",
        email: "",
        password: "defaultPassword",
        phoneNumber: "",
        typeOfUser: userTypes.length > 0 ? userTypes[0] : null
      });
      // Cierra el modal después de agregar
      document.getElementById('closeAddModal').click();
    } catch (err) {
      console.error("Error al agregar usuario:", err);
      alert("Error al agregar usuario: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este usuario?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        alert("Error al eliminar usuario: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const getFullName = (user) => {
    return `${user.firstName || ''} ${user.surname || ''}`.trim();
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando usuarios...</div>;
  }

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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{getFullName(user)}</td>
                <td>{user.email}</td>
                <td>{user.typeOfUser?.name || 'No asignado'}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
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
                        name="firstName"
                        value={selectedUser.firstName || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        name="surname"
                        value={selectedUser.surname || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={selectedUser.email || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Usuario</label>
                      <select
                        className="form-control"
                        value={selectedUser.typeOfUser?._id || ''}
                        onChange={handleTypeChange}
                        required
                      >
                        {userTypes.map((type) => (
                          <option key={type._id} value={type._id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
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
                  id="closeAddModal"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={newUser.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="surname"
                      value={newUser.surname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newUser.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Usuario <span className="text-danger">*</span></label>
                    <select
                      className="form-control"
                      value={newUser.typeOfUser?._id || ''}
                      onChange={handleTypeChange}
                      required
                    >
                      {userTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
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
                  onClick={handleAddUser}
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