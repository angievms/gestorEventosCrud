const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }, // Hora militar
  ubicacion: { type: String, required: true },
  descripcion: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;