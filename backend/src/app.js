const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const rutasUsuario = require('./rutas/rutasUsuario');
const rutasEvento = require('./rutas/rutasEvento');

dotenv.config();

// Crear servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/usuarios', rutasUsuario);
app.use('/api/eventos', rutasEvento);

app.get('/', (req, res) => {
    res.send('¡El servidor backend está funcionando!');
  });

module.exports = app;