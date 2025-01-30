const Evento = require('../modelos/modeloEvento');

// Crear un evento
exports.crearEvento = async (req, res) => {
  const { nombre, fecha, hora, ubicacion, descripcion, userId } = req.body;

  try {
      // Crear evento
      const nuevoEvento = new Evento({
          nombre,
          fecha,
          hora,
          ubicacion,
          descripcion,
          userId
      });

      await nuevoEvento.save();
      res.status(201).json({ mensaje: 'Evento creado', evento: nuevoEvento });
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear el evento', error: error.message });
  }
};


// Obtener todos los eventos
exports.obtenerEventos = async (req, res) => {
  try {
      const eventos = await Evento.find().populate('userId');
      res.status(200).json(eventos);
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los eventos', error: error.message });
  }
};

// Actualizar un evento
exports.actualizarEvento = async (req, res) => {
    try {
        const eventoActualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(eventoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el evento', error: error.message });
    }
};

// Eliminar un evento
exports.eliminarEvento = async (req, res) => {
    try {
        await Evento.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el evento', error: error.message });
    }
};
