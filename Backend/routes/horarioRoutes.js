const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware'); // asumiendo middleware de roles

const horarioCtrl = require('../controllers/horarioController');

// Crear (solo admin)
router.post('/horarios', auth('Admin'), horarioCtrl.crearHorario);

// Ver todos (admin, docente y estudiantes)
router.get('/horarios', auth(['Admin', 'Docente', 'Estudiante']), horarioCtrl.obtenerHorarios);


// Ver uno por ID
router.get('/horarios/:id', auth(['Admin', 'Docente']), horarioCtrl.obtenerHorarioPorId);

// Editar (solo admin)
router.put('/horarios/:id', auth('Admin'), horarioCtrl.actualizarHorario);

// Eliminar (solo admin)
router.delete('/horarios/:id', auth('Admin'), horarioCtrl.eliminarHorario);

module.exports = router;