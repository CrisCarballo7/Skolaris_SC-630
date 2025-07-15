const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuarios,
  eliminarUsuarios,
  obtenerUsuarioActual,
  asignarGrupoAUsuario,
} = require('../controllers/usuarioController');

// Crear usuario
router.post('/', crearUsuario);

// Obtener todos
router.get('/', obtenerUsuarios);

// Obtener usuario autenticado
router.get('/me', authMiddleware(), obtenerUsuarioActual);

// Actualizar usuario autenticado (sin id en URL)
router.put('/update', authMiddleware(), actualizarUsuarios);

// Actualizar usuario por id (opcional, admin o similar)
router.put('/:id', actualizarUsuarios);

// Eliminar usuario
router.delete('/:id', eliminarUsuarios);

router.put('/:id/asignar-grupo', authMiddleware('Admin'), asignarGrupoAUsuario);


module.exports = router;
