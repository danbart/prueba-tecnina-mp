const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casos.controller');

router.get('/', casosController.obtenerCasos);
router.post('/', casosController.crearCaso);

module.exports = router;
