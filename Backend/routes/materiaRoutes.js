const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const materiaCtrl = require('../controllers/materiaController');

// Solo admin puede crear, editar, eliminar
router.post('/materias', auth('Admin'), materiaCtrl.crearMateria);
router.get('/materias', auth(['Admin', 'Docente', 'Estudiante']), materiaCtrl.obtenerMaterias);
router.get('/materias/:id', auth(['Admin', 'Docente', 'Estudiante']), materiaCtrl.obtenerMateriaPorId);
router.put('/materias/:id', auth('Admin'), materiaCtrl.actualizarMateria);
router.delete('/materias/:id', auth('Admin'), materiaCtrl.eliminarMateria);

// Agregar estudiantes a materia (solo admin)
router.patch('/materias/:id/estudiantes', auth('Admin'), materiaCtrl.agregarEstudiantes);

module.exports = router;
