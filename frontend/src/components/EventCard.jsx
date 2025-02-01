import { useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Modal, Button, Form } from "react-bootstrap";
import apiClient from "../api/axiosConfig";

const EventCard = ({ evento, onEditar, onEliminar }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [datosEvento, setDatosEvento] = useState(evento);

  // Abrir y cerrar modales
  const handleShowEditarModal = () => setShowEditarModal(true);
  const handleCloseEditarModal = () => setShowEditarModal(false);
  const handleShowEliminarModal = () => setShowEliminarModal(true);
  const handleCloseEliminarModal = () => setShowEliminarModal(false);

  // Manejar cambios en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEvento({ ...datosEvento, [name]: value });
  };

  // Manejar la edición del evento
  const handleEditar = async () => {
    try {
      // Convertir la fecha a UTC
      const fechaUTC = new Date(datosEvento.fecha + 'T00:00:00').toISOString();

      await apiClient.put(`/eventos/${evento._id}`, {
        ...datosEvento,
        fecha: fechaUTC, // Enviar la fecha en formato UTC
      });

      onEditar(evento._id, datosEvento); // Actualizar el estado en el componente padre
      handleCloseEditarModal();
    } catch (error) {
      console.error("Error al editar el evento:", error);
    }
  };

  // Manejar la eliminación del evento
  const handleEliminar = async () => {
    try {
      await apiClient.delete(`/eventos/${evento._id}`);
      onEliminar(evento._id); // Actualizar el estado en el componente padre
      handleCloseEliminarModal();
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible";
    const fechaObj = new Date(fecha);
    return isNaN(fechaObj.getTime()) ? "Fecha inválida" : fechaObj.toLocaleDateString();
  };

  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title text-primary">{evento.nombre}</h5>
            <p className="card-text">
              <strong>Fecha:</strong> {formatearFecha(evento.fecha)} <br />
              <strong>Hora:</strong> {evento.hora} <br />
              <strong>Ubicación:</strong> {evento.ubicacion} <br />
              {evento.descripcion && (
                <span>
                  <strong>Descripción:</strong> {evento.descripcion}
                </span>
              )}
            </p>
          </div>
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={handleShowEditarModal}
            >
              <Pencil /> {/* Ícono de editar */}
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={handleShowEliminarModal}
            >
              <Trash /> {/* Ícono de eliminar */}
            </button>
          </div>
        </div>
      </div>

      {/* Modal para editar */}
      <Modal show={showEditarModal} onHide={handleCloseEditarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={datosEvento.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={datosEvento.fecha?.split("T")[0] || ""} // Mostrar solo la parte de la fecha
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={datosEvento.hora}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={datosEvento.ubicacion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={datosEvento.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditar}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para eliminar */}
      <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el evento "{evento.nombre}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEliminarModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventCard;