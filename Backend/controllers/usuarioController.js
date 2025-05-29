const modeloUsuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

// Crear usuario con hashing de contraseña
const crearUsuario = async (req, res) => {
  try {
    const datos = req.body;

    // Validar que haya contraseña en el body
    if (!datos.contrasena) {
      return res.status(400).json({ error: "La contraseña es obligatoria" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(datos.contrasena, 10);
    datos.contrasena = hashedPassword;

    const nuevoUsuario = new modeloUsuario(datos);
    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    // Manejo de error por clave duplicada (email único)
    if (error.code === 11000) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await modeloUsuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Actualizar usuario (sin cambiar la contraseña aquí)
const actualizarUsuarios = async (req, res) => {
  try {
    // Para actualizar contraseña, se recomienda un endpoint aparte
    const usuarioActualizado = await modeloUsuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};

// Eliminar usuario
const eliminarUsuarios = async (req, res) => {
  try {
    await modeloUsuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar los datos" });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuarios,
  eliminarUsuarios,
};
// Este controlador maneja las operaciones CRUD para los usuarios, incluyendo la creación de usuarios con hashing de contraseña.