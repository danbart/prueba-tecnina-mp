const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casos.controller');

router.get('/', casosController.obtenerCasos);
router.post('/', casosController.crearCaso);
router.put('/:id/reasignar', casosController.reasignarCaso);
router.patch('/:id/estado', casosController.actualizarEstado);
router.get('/:id/historial', casosController.history);

module.exports = router;
