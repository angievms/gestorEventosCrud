const EventCard = ({ nombre, fecha, hora, ubicacion, descripcion }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">{nombre}</h5>
        <p className="card-text">
          <strong>Fecha:</strong> {fecha} <br />
          <strong>Hora:</strong> {hora} <br />
          <strong>Ubicación:</strong> {ubicacion} <br />
          {descripcion && (
            <span>
              <strong>Descripción:</strong> {descripcion}
            </span>
          )}
        </p>
        <button className="btn btn-primary me-2">
          <i className="bi bi-pencil"></i> Editar
        </button>
        <button className="btn btn-danger">
          <i className="bi bi-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
};

export default EventCard;
