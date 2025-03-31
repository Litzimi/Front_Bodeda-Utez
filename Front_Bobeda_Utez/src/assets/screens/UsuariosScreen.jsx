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
    firstName: "Usuario",
    secondName: "",
    surname: "Demo",
    lastName: "",
    email: "usuario@demo.com",
    password: "DefaultPassword123!",
    phoneNumber: "5551234567",
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
      console.log("Tipos de usuario recibidos:", response.data);
      if (response.data?.data && Array.isArray(response.data.data)) {
        const types = response.data.data;
        setUserTypes(types);
        if (types.length > 0) {
          setNewUser(prev => ({
            ...prev,
            typeOfUser: { id: types[0].id, name: types[0].name }
          }));
        }
      }
    } catch (err) {
      console.error("Error cargando tipos:", err);
      alert("Error al cargar tipos de usuario");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser({ 
      ...user,
      typeOfUser: user.typeOfUser ? {
        id: user.typeOfUser.id,
        name: user.typeOfUser.name
      } : null
    });
  };

  const handleAddClick = () => {
    setNewUser({
      firstName: "Usuario",
      secondName: "",
      surname: "Demo",
      lastName: "",
      email: `usuario${Math.floor(Math.random() * 1000)}@demo.com`,
      password: "DefaultPassword123!",
      phoneNumber: `555${Math.floor(1000000 + Math.random() * 9000000)}`,
      typeOfUser: userTypes.length > 0 ? {
        id: userTypes[0].id,
        name: userTypes[0].name
      } : null
    });
  };

  const handleTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    const selectedType = userTypes.find(type => type.id === selectedTypeId);
    
    if (selectedUser) {
      setSelectedUser(prev => ({ 
        ...prev, 
        typeOfUser: selectedType ? {
          id: selectedType.id,
          name: selectedType.name
        } : null
      }));
    } else {
      setNewUser(prev => ({ 
        ...prev, 
        typeOfUser: selectedType ? {
          id: selectedType.id,
          name: selectedType.name
        } : null
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(API_URL, {
        ...selectedUser,
        typeOfUser: selectedUser.typeOfUser ? {
          id: selectedUser.typeOfUser.id,
          name: selectedUser.typeOfUser.name
        } : null
      });
      fetchUsers();
      setSelectedUser(null);
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert(`Error al actualizar: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.typeOfUser) {
        alert("Por favor seleccione un tipo de usuario");
        return;
      }
  
      const userToCreate = {
        firstName: newUser.firstName || "Usuario",
        secondName: newUser.secondName || "",
        surname: newUser.surname || "Demo",
        lastName: newUser.lastName || "",
        email: newUser.email,
        password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        typeOfUser: {
          id: newUser.typeOfUser.id,
          name: newUser.typeOfUser.name
        }
      };
  
      console.log("Datos a enviar:", JSON.stringify(userToCreate, null, 2));
  
      const response = await axios.post(API_URL, userToCreate, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        fetchUsers();
        setNewUser({
          firstName: "Usuario",
          secondName: "",
          surname: "Demo",
          lastName: "",
          email: `usuario${Math.floor(Math.random() * 1000)}@demo.com`,
          password: "DefaultPassword123!",
          phoneNumber: `555${Math.floor(1000000 + Math.random() * 9000000)}`,
          typeOfUser: userTypes.length > 0 ? {
            id: userTypes[0].id,
            name: userTypes[0].name
          } : null
        });
        document.getElementById('closeAddModal').click();
      } else {
        throw new Error(response.data?.message || "Error en el servidor");
      }
    } catch (err) {
      console.error("Error completo:", {
        message: err.message,
        response: err.response?.data,
        request: err.config?.data
      });
      alert(`Error al registrar: ${err.response?.data?.message || err.message}`);
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
        alert(`Error al eliminar: ${err.response?.data?.message || err.message}`);
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
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{getFullName(user)}</td>
                <td>{user.email}</td>
                <td>{user.typeOfUser?.name || 'Sin tipo'}</td>
                <td>{user.phoneNumber}</td>
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

        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Nuevo Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeAddModal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  Se registrará un usuario
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input type="text" className="form-control" value={newUser.firstName} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido:</label>
                  <input type="text" className="form-control" value={newUser.surname} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo:</label>
                  <input type="text" className="form-control" value={newUser.email} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono:</label>
                  <input type="text" className="form-control" value={newUser.phoneNumber} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                  <input type="text" className="form-control" value={newUser.password} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo de Usuario:</label>
                  <select
                    className="form-control"
                    value={newUser.typeOfUser?.id || ''}
                    onChange={handleTypeChange}
                  >
                    {userTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddUser}
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedUser && (
          <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">Editar Usuario</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
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
                        name="firstName"
                        value={selectedUser.firstName || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        name="surname"
                        value={selectedUser.surname || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, surname: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={selectedUser.email || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Usuario</label>
                      <select
                        className="form-control"
                        value={selectedUser.typeOfUser?.id || ''}
                        onChange={handleTypeChange}
                      >
                        {userTypes.map((type) => (
                          <option key={type.id} value={type.id}>
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
      </div>
    </div>
  );
}