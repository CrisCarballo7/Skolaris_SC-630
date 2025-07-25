const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuarioModel');

const {
  crearUsuario,
  actualizarUsuarios,
  eliminarUsuarios,
  obtenerUsuarioActual,
  asignarGrupoAUsuario,
  obtenerEstudiantes
} = require('../controllers/usuarioController');

// Crear usuario
router.post('/', crearUsuario);

// Obtener todos o filtrar por rol
router.get('/', authMiddleware(), async (req, res) => {
  try {
    const rol = req.query.rol;
    const filtro = rol ? { rol } : {};
    const usuarios = await Usuario.find(filtro);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario autenticado
router.get('/me', authMiddleware(), obtenerUsuarioActual);

// Actualizar usuario autenticado
router.put('/update', authMiddleware(), actualizarUsuarios);

// Actualizar usuario por ID
router.put('/:id', authMiddleware(), actualizarUsuarios);

// Eliminar usuario
router.delete('/:id', authMiddleware('Admin'), eliminarUsuarios);

// Asignar grupo (solo Admin)
router.put('/:id/asignar-grupo', authMiddleware('Admin'), asignarGrupoAUsuario);

router.get('/estudiantes', authMiddleware(['Admin']), obtenerEstudiantes);

module.exports = router;
