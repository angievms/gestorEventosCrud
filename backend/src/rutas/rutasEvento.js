const express = require("express");
const router = express.Router();
const controladorEvento = require("../controladores/controladorEvento");
const middlewareAutenticacion = require("../middleware/middlewareAuth");

// Aplicar el middleware de autenticación a todas las rutas de eventos
router.use(middlewareAutenticacion);

router.post("/", controladorEvento.crearEvento);
router.get("/", controladorEvento.obtenerEventos);
router.put("/:id", controladorEvento.actualizarEvento);
router.delete("/:id", controladorEvento.eliminarEvento);
router.get("/filtrar", controladorEvento.filtrarEventos);

module.exports = router;