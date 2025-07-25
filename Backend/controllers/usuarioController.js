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
    const filtro = {};

    if (req.query.rol) {
      filtro.rol = req.query.rol; // Esto aplica el filtro cuando haces /usuarios?rol=Docente
    }

    const usuarios = await modeloUsuario.find(filtro).select('-contrasena');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};


// Actualizar usuario basado en el id del token (req.user)
const actualizarUsuarios = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "ID de usuario no encontrado" });
    }

    const usuarioActualizado = await modeloUsuario.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error(error);
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

// =====> NUEVO: Obtener datos del usuario autenticado
const obtenerUsuarioActual = async (req, res) => {
  try {
    
    const userId = req.user.id || req.user._id;
    if (!userId) {
      return res.status(400).json({ error: 'ID de usuario no encontrado en token' });
    }

    // Traer del modelo solo los campos a exponer (sin la contraseña)
    const usuario = await modeloUsuario.findById(userId).select('-contrasena');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no existe' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos del usuario actual' });
  }
};

//funcion para agregar un grupo al estudiante
const asignarGrupoAUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id; // ✅ ESTA LÍNEA ES CLAVE
    console.log('➡️ ID recibido:', req.params.id);
    const { grupoId } = req.body;
    console.log('➡️ Grupo ID recibido:', req.body.grupoId);
    const usuario = await modeloUsuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (usuario.rol !== 'Estudiante') {
      return res.status(400).json({ error: 'Solo se pueden asignar grupos a estudiantes' });
    }

    usuario.grupo = grupoId;
    await usuario.save();

    res.status(200).json({ message: 'Grupo asignado correctamente', usuario });
  } catch (error) {
    console.error('[ERROR] al asignar grupo:', error);
    res.status(500).json({ error: 'Error al asignar grupo al estudiante' });
  }
};

const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Usuario.find({ rol: 'Estudiante' }).populate('grupo');
    res.json(estudiantes);
  } catch (error) {
    console.error("❌ Error en obtenerEstudiantes:", error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};





module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuarios,
  eliminarUsuarios,
  obtenerUsuarioActual,
  asignarGrupoAUsuario,
  obtenerEstudiantes
};
