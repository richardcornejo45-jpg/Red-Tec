const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equipos.controller');

// GET a /api/equipos -> Ejecuta listarEquipos
router.get('/', equiposController.listarEquipos);

// POST a /api/equipos -> Ejecuta crearEquipo
router.post('/', equiposController.crearEquipo);

module.exports = router;