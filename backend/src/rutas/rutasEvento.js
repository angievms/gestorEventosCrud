const express = require('express');
const router = express.Router();
const controladorEvento = require('../controladores/controladorEvento');

router.post('/', controladorEvento.crearEvento);
router.get('/', controladorEvento.obtenerEventos);
router.put('/:id', controladorEvento.actualizarEvento);
router.delete('/:id', controladorEvento.eliminarEvento);

module.exports = router;