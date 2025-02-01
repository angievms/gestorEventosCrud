const Evento = require("../modelos/modeloEvento");

// Crear un evento
exports.crearEvento = async (req, res) => {
  const { nombre, fecha, hora, ubicacion, descripcion } = req.body;
  const userId = req.usuario.id;

  try {
    const nuevoEvento = new Evento({
      nombre,
      fecha: new Date(fecha),
      hora,
      ubicacion,
      descripcion,
      userId,
    });

    await nuevoEvento.save();
    res.status(201).json({ mensaje: "Evento creado", evento: nuevoEvento });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el evento", error: error.message });
  }
};

// Obtener todos los eventos del usuario autenticado
exports.obtenerEventos = async (req, res) => {
  const userId = req.usuario.id;

  try {
    const eventos = await Evento.find({ userId });
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los eventos", error: error.message });
  }
};

// Actualizar un evento
exports.actualizarEvento = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, hora, ubicacion, descripcion } = req.body;

  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(
      id,
      {
        nombre,
        fecha: new Date(fecha), // Convertir la fecha a objeto Date (UTC)
        hora,
        ubicacion,
        descripcion,
      },
      { new: true }
    );

    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el evento", error: error.message });
  }
};

// Eliminar un evento
exports.eliminarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    await Evento.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el evento", error: error.message });
  }
};

// Filtrar eventos por fecha o ubicación
exports.filtrarEventos = async (req, res) => {
  const { fecha, ubicacion } = req.query;

  try {
    const filtro = {};

    // Filtrar por fecha
    if (fecha) {
      const fechaInicio = new Date(fecha); // Convertir la fecha a objeto Date
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + 1); // Añadir un día para incluir todos los eventos del día

      filtro.fecha = {
        $gte: fechaInicio, // Fecha mayor o igual a la fecha de inicio
        $lt: fechaFin, // Fecha menor que la fecha de fin
      };
    }

    // Filtrar por ubicación
    if (ubicacion) {
      const ubicacionRegex = new RegExp(ubicacion, "i"); // Ignorar mayúsculas/minúsculas
      filtro.ubicacion = { $regex: ubicacionRegex };
    }

    const eventosFiltrados = await Evento.find(filtro);
    res.status(200).json(eventosFiltrados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al filtrar eventos", error: error.message });
  }
};