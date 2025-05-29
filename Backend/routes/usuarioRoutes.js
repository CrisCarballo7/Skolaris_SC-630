const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuarios,
  eliminarUsuarios,
} = require('../controllers/usuarioController');  // Ajusta el path si es necesario

// Crear usuario
router.post('/usuarios', crearUsuario);

// Obtener todos
router.get('/usuarios', obtenerUsuarios);

// Actualizar usuario (PUT por ID)
router.put('/usuarios/:id', actualizarUsuarios);

// Eliminar usuario (DELETE por ID)
router.delete('/usuarios/:id', eliminarUsuarios);

module.exports = router;
