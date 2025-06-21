const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  crearMateria,
  obtenerMaterias,
  obtenerMateriaPorId,
  actualizarMateria,
  eliminarMateria,
} = require('../controllers/materiaController');

// Crear materia
router.post('/', auth('Admin'), crearMateria);

// Obtener todas las materias
router.get('/', auth(['Admin', 'Docente']), obtenerMaterias);

// Obtener materia por ID
router.get('/:id', auth(['Admin', 'Docente']), obtenerMateriaPorId);

// Actualizar materia
router.put('/:id', auth('Admin'), actualizarMateria);

// Eliminar materia
router.delete('/:id', auth('Admin'), eliminarMateria);

module.exports = router;
