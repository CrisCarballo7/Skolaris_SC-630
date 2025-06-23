const express = require('express');
const router  = express.Router();
const {
  crearAsistencia,
  obtenerAsistencias,
  actualizarAsistencia,
  eliminarAsistencia
} = require('../controllers/asistenciaController');

// CRUD de Asistencias
router.post('/',    crearAsistencia);    // POST   /api/asistencias
router.get('/',     obtenerAsistencias); // GET    /api/asistencias
router.put('/:id',  actualizarAsistencia);// PUT   /api/asistencias/:id
router.delete('/:id', eliminarAsistencia);// DELETE /api/asistencias/:id

module.exports = router;
