import { useState, useEffect } from "react";
import apiClient from "../api/axiosConfig";
import EventCard from "./EventCard";
import { Modal, Button, Form } from "react-bootstrap";

const EventList = () => {
  const [eventos, setEventos] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroUbicacion, setFiltroUbicacion] = useState("");
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    ubicacion: "",
    descripcion: "",
  });

  // Función para formatear la fecha a YYYY-MM-DD
  const formatearFecha = (fecha) => {
    if (!fecha) return ""; // Si no hay fecha, retorna una cadena vacía

    // Convertir la fecha al formato YYYY-MM-DD
    const [day, month, year] = fecha.split("/");
    if (day && month && year) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return fecha; // Si ya está en el formato correcto, retorna la fecha tal cual
  };

  // Obtener todos los eventos del usuario autenticado
  const obtenerEventos = async () => {
    try {
      const response = await apiClient.get("/eventos");
      setEventos(response.data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  // Filtrar eventos por fecha o ubicación
  const handleFiltrarEventos = async () => {
    try {
      const fechaFormateada = formatearFecha(filtroFecha); // Formatear la fecha
      const ubicacionMinusculas = filtroUbicacion.toLowerCase(); // Convertir a minúsculas

      const response = await apiClient.get("/eventos/filtrar", {
        params: { fecha: fechaFormateada, ubicacion: ubicacionMinusculas },
      });

      setEventos(response.data);
    } catch (error) {
      console.error("Error al filtrar eventos:", error);
    }
  };

  // Manejar la tecla "Enter" en los campos de entrada
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFiltrarEventos();
    }
  };

  // Abrir y cerrar el modal de creación
  const handleShowCrearModal = () => setShowCrearModal(true);
  const handleCloseCrearModal = () => setShowCrearModal(false);

  // Manejar cambios en el formulario de creación
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento({ ...nuevoEvento, [name]: value });
  };

  // Crear un nuevo evento
  const handleCrearEvento = async () => {
    try {
      // Convertir la fecha a UTC
      const fechaUTC = new Date(nuevoEvento.fecha + 'T00:00:00').toISOString();

      const response = await apiClient.post("/eventos", {
        ...nuevoEvento,
        fecha: fechaUTC, // Enviar la fecha en formato UTC
      });

      setEventos([...eventos, response.data]); // Agregar el nuevo evento a la lista
      handleCloseCrearModal(); // Cerrar el modal
      setNuevoEvento({ // Limpiar el formulario
        nombre: "",
        fecha: "",
        hora: "",
        ubicacion: "",
        descripcion: "",
      });
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    obtenerEventos();
  }, []);

  return (
    <div>
      {/* Filtros */}
      <div className="mb-4">
        <input
          type="text"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control mb-2"
          placeholder="Filtrar por fecha (DD/MM/YYYY)"
        />
        <input
          type="text"
          value={filtroUbicacion}
          onChange={(e) => setFiltroUbicacion(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control mb-2"
          placeholder="Filtrar por ubicación"
        />
        <button onClick={handleFiltrarEventos} className="btn btn-primary">
          Filtrar
        </button>
      </div>

      {/* Botón para crear nuevo evento */}
      <div className="mb-4 text-center">
        <Button variant="primary" onClick={handleShowCrearModal}>
          Crear Nuevo Evento
        </Button>
      </div>

      {/* Lista de eventos */}
      {eventos.length === 0 ? (
        <div className="text-center">
          <p>No tienes eventos creados.</p>
        </div>
      ) : (
        eventos.map((evento) => (
          <EventCard
            key={evento._id}
            evento={evento}
            onEditar={() => console.log("Editar:", evento._id)}
            onEliminar={() => console.log("Eliminar:", evento._id)}
          />
        ))
      )}

      {/* Modal para crear eventos */}
      <Modal show={showCrearModal} onHide={handleCloseCrearModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoEvento.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={nuevoEvento.fecha}
                onChange={handleChange}
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={nuevoEvento.hora}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={nuevoEvento.ubicacion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={nuevoEvento.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCrearModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCrearEvento}>
            Crear Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventList;