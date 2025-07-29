const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware'); // asumiendo middleware de roles
const { obtenerBloquesPorGrupo } = require('../controllers/horarioController');
const horarioCtrl = require('../controllers/horarioController');

// Crear (solo admin)
            //ruta    -   quien la usa -  el controller
router.post('/horarios', auth('Admin'), horarioCtrl.crearHorario);

// Ver todos (admin, docente y estudiantes)
router.get('/horarios', auth(['Admin', 'Docente', 'Estudiante']), horarioCtrl.obtenerHorarios);


// Ver uno por ID
router.get('/horarios/:id', auth(['Admin', 'Docente']), horarioCtrl.obtenerHorarioPorId);

// Editar (solo admin)
router.put('/horarios/:id', auth('Admin'), horarioCtrl.actualizarHorario);

// Eliminar (solo admin)
router.delete('/horarios/:id', auth('Admin'), horarioCtrl.eliminarHorario);

// Ruta para obtener horario por id de estudiante
router.get('/estudiante/:id', horarioCtrl.obtenerHorarioEstudiante);


// Vista por bloques
router.get('/bloques/:grupoId', obtenerBloquesPorGrupo);

module.exports = router;