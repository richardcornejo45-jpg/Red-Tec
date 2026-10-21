const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamos.controller');
const { validarPrestamo } = require('../middlewares/prestamos.middleware');

router.get('/', prestamosController.listarPrestamos);

// Se añade el middleware "validarPrestamo" como paso intermedio
router.post('/', validarPrestamo, prestamosController.crearPrestamo);

router.put('/:id/devolucion', prestamosController.devolverPrestamo);

module.exports = router;