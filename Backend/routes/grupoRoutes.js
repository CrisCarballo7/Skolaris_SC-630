const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  crearGrupo,
  obtenerGrupos,
  actualizarGrupo,
  eliminarGrupo,
} = require('../controllers/grupoController');

router.post('/', authMiddleware('Admin'), crearGrupo);
router.get('/', authMiddleware(['Admin', 'Docente']), obtenerGrupos);
router.put('/:id', authMiddleware('Admin'), actualizarGrupo);
router.delete('/:id', authMiddleware('Admin'), eliminarGrupo);

module.exports = router;
