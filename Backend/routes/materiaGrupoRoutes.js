const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  crearMateriaGrupo,
  obtenerMateriasGrupos,
  obtenerMateriaGrupoPorId,
  actualizarMateriaGrupo,
  eliminarMateriaGrupo,
} = require('../controllers/materiaGrupoController');

// Crear asignación materia-grupo-docente
router.post('/', auth('Admin'), crearMateriaGrupo);

// Obtener todas las asignaciones
router.get('/', auth(['Admin', 'Docente']), obtenerMateriasGrupos);

// Obtener asignación por ID
router.get('/:id', auth(['Admin', 'Docente']), obtenerMateriaGrupoPorId);

// Actualizar asignación
router.put('/:id', auth('Admin'), actualizarMateriaGrupo);

// Eliminar asignación
router.delete('/:id', auth('Admin'), eliminarMateriaGrupo);

module.exports = router;
