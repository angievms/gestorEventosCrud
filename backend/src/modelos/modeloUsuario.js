const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    direccion: { type: String },
    telefono: { type: String },
    rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' },
    fecha_creacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);