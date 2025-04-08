import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
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
    password: "",
    phoneNumber: "",
    typeOfUser: null,
    archive: null
  });

  const navigate = useNavigate();
  const editModalRef = useRef(null);
  const addModalRef = useRef(null);
  const [editModalInstance, setEditModalInstance] = useState(null);
  const [addModalInstance, setAddModalInstance] = useState(null);

  // Inicialización de modals
  useEffect(() => {
    if (editModalRef.current && !editModalInstance) {
      setEditModalInstance(new bootstrap.Modal(editModalRef.current));
    }
    if (addModalRef.current && !addModalInstance) {
      setAddModalInstance(new bootstrap.Modal(addModalRef.current));
    }

    return () => {
      if (editModalInstance) {
        editModalInstance.dispose();
      }
      if (addModalInstance) {
        addModalInstance.dispose();
      }
    };
  }, [editModalInstance, addModalInstance]);

  useEffect(() => {
    fetchUsers();
    fetchUserTypes();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      console.log("Respuesta de usuarios:", response.data);

      if (response.data && response.data.code === 200) {
        const usersData = Array.isArray(response.data.data) ? response.data.data : [];
        setUsers(usersData);

        if (usersData.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'No hay usuarios registrados'
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: response.data?.message || 'No se pudieron cargar los usuarios'
        });
      }
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los usuarios: ' + (err.response?.data?.message || err.message)
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTypes = async () => {
    try {
      const response = await axios.get(TYPES_URL);
      console.log("Tipos de usuario:", response.data);

      if (response.data?.code === 200) {
        const types = Array.isArray(response.data.data) ? response.data.data : [];
        setUserTypes(types);

        if (types.length > 0) {
          setNewUser(prev => ({
            ...prev,
            typeOfUser: types[0]
          }));
        }
      }
    } catch (err) {
      console.error("Error cargando tipos:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los tipos de usuario: ' + (err.response?.data?.message || err.message)
      });
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser({
      ...user,
      typeOfUser: user.typeOfUser || null
    });
    editModalInstance?.show();
  };

  const handleAddClick = () => {
    setNewUser({
      firstName: "",
      secondName: "",
      surname: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      typeOfUser: userTypes.length > 0 ? userTypes[0] : null,
      archive: null
    });
    addModalInstance?.show();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewUser(prev => ({ ...prev, archive: e.target.files[0] }));
  };

  const handleTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    const selectedType = userTypes.find(type => type._id === selectedTypeId || type.id === selectedTypeId);

    setNewUser(prev => ({
      ...prev,
      typeOfUser: selectedType || null
    }));
  };

  const handleEditTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    const selectedType = userTypes.find(type => type._id === selectedTypeId || type.id === selectedTypeId);

    setSelectedUser(prev => ({
      ...prev,
      typeOfUser: selectedType || null
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (!selectedUser.typeOfUser) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Por favor seleccione un tipo de usuario'
        });
        return;
      }

      const formData = new FormData();
      formData.append('id', selectedUser._id || selectedUser.id);
      formData.append('firstName', selectedUser.firstName);
      formData.append('secondName', selectedUser.secondName);
      formData.append('surname', selectedUser.surname);
      formData.append('lastName', selectedUser.lastName);
      formData.append('email', selectedUser.email);
      formData.append('password', selectedUser.password);
      formData.append('phoneNumber', selectedUser.phoneNumber);
      formData.append('typeOfUser', selectedUser.typeOfUser._id || selectedUser.typeOfUser.id);

      const response = await axios.put(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado correctamente'
        });

        fetchUsers();
        setSelectedUser(null);
        editModalInstance?.hide();
      } else {
        throw new Error(response.data.message || "Error en el servidor");
      }
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error al actualizar el usuario'
      });
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.typeOfUser) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Por favor seleccione un tipo de usuario'
        });
        return;
      }

      const formData = new FormData();

      if (!newUser.archive) {
        try {
          const response = await fetch('/img/UsuarioNuevo.png');
          if (!response.ok) throw new Error('No se pudo cargar la imagen por defecto');
          const blob = await response.blob();
          formData.append('file', blob, 'default.png');
        } catch (error) {
          console.error("Error al cargar imagen por defecto:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la imagen por defecto. Por favor, seleccione una imagen.'
          });
          return;
        }
      } else {
        formData.append('file', newUser.archive);
      }

      formData.append('firstName', newUser.firstName);
      formData.append('secondName', newUser.secondName);
      formData.append('surname', newUser.surname);
      formData.append('lastName', newUser.lastName);
      formData.append('email', newUser.email);
      formData.append('password', newUser.password);
      formData.append('phoneNumber', newUser.phoneNumber);
      formData.append('typeOfUser', newUser.typeOfUser._id || newUser.typeOfUser.id);

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data && response.data.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.data.message || 'Usuario creado correctamente'
        });

        fetchUsers();
        setNewUser({
          firstName: "",
          secondName: "",
          surname: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          typeOfUser: userTypes.length > 0 ? userTypes[0] : null,
          archive: null
        });
        addModalInstance?.hide();
      } else {
        const errorMsg = response.data?.message || "Error desconocido en el servidor";
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      const errorText = err.message === "Operacion exitosa"
          ? "Usuario creado correctamente"
          : err.response?.data?.message || err.message;

      Swal.fire({
        icon: err.message === "Operacion exitosa" ? 'success' : 'error',
        title: err.message === "Operacion exitosa" ? 'Éxito' : 'Error',
        text: errorText
      });

      if (err.message === "Operacion exitosa") {
        fetchUsers();
        addModalInstance?.hide();
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.data.code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El usuario ha sido eliminado'
          });
          fetchUsers();
        } else {
          throw new Error(response.data.message || "Error en el servidor");
        }
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || 'Error al eliminar el usuario'
        });
      }
    }
  };

  const getFullName = (user) => {
    return `${user.firstName || ''} ${user.secondName || ''} ${user.surname || ''} ${user.lastName || ''}`.trim();
  };

  if (loading) {
    return (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando usuarios...</p>
        </div>
    );
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
                <tr key={user._id || user.id}>
                  <td>{getFullName(user)}</td>
                  <td>{user.email}</td>
                  <td>{user.typeOfUser?.name || 'Sin tipo'}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditClick(user)}
                    >
                      Editar
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id || user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Modal para agregar nuevo usuario */}
          <div className="modal fade" ref={addModalRef} id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" style={{ maxWidth: '800px' }}>
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title" id="addModalLabel">Nuevo Usuario</h5>
                  <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">Primer Nombre*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Segundo Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="secondName"
                            value={newUser.secondName}
                            onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Apellido Paterno*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={newUser.surname}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Apellido Materno</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">Correo Electrónico*</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Contraseña*</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            required
                        />
                        <small className="text-muted">Mínimo 8 caracteres</small>
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Teléfono*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={newUser.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Tipo de Usuario*</label>
                        <select
                            className="form-select"
                            value={newUser.typeOfUser?._id || newUser.typeOfUser?.id || ''}
                            onChange={handleTypeChange}
                            required
                        >
                          {userTypes.map((type) => (
                              <option key={type._id || type.id} value={type._id || type.id}>
                                {type.name}
                              </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group mt-3">
                        <label className="form-label fw-bold mb-2">Foto de perfil</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <small className="text-muted">Formatos: JPG, PNG (Max. 2MB)</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddUser}
                  >
                    Registrar Usuario
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal para editar usuario */}
          <div className="modal fade" ref={editModalRef} id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Primer Nombre*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={selectedUser?.firstName || ''}
                            onChange={handleEditInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Segundo Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="secondName"
                            value={selectedUser?.secondName || ''}
                            onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Apellido Paterno*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={selectedUser?.surname || ''}
                            onChange={handleEditInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Apellido Materno</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={selectedUser?.lastName || ''}
                            onChange={handleEditInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Correo Electrónico*</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={selectedUser?.email || ''}
                            onChange={handleEditInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contraseña*</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={selectedUser?.password || ''}
                            onChange={handleEditInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Teléfono*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={selectedUser?.phoneNumber || ''}
                            onChange={handleEditInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Tipo de Usuario*</label>
                        <select
                            className="form-control"
                            value={selectedUser?.typeOfUser?._id || selectedUser?.typeOfUser?.id || ''}
                            onChange={handleEditTypeChange}
                            required
                        >
                          {userTypes.map((type) => (
                              <option key={type._id || type.id} value={type._id || type.id}>
                                {type.name}
                              </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
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
                      onClick={handleSaveChanges}
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}