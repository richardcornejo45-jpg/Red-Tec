const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamos.controller');
const { validarPrestamo } = require('../middlewares/prestamos.middleware');

// Importamos el nuevo candado
const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/', prestamosController.listarPrestamos);

// Agregamos verificarToken como primer paso antes de validarPrestamo
router.post('/', verificarToken, validarPrestamo, prestamosController.crearPrestamo);

// Agregamos verificarToken antes de procesar la devolución
router.put('/:id/devolucion', verificarToken, prestamosController.devolverPrestamo);

module.exports = router;