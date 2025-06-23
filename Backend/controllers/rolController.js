const Rol = require('../models/rolModel');

// Crear un nuevo rol
exports.crearRol = async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.nombre.trim()) {
      return res.status(400).json({ error: 'El nombre del rol es obligatorio' });
    }
    const rol = new Rol({ nombre: req.body.nombre.trim() });
    await rol.save();
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un rol por ID
exports.actualizarRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre del rol es obligatorio' });
    }
    const rol = await Rol.findByIdAndUpdate(
      req.params.id,
      { nombre: nombre.trim() },
      { new: true }
    );
    if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un rol por ID
exports.eliminarRol = async (req, res) => {
  try {
    const rol = await Rol.findByIdAndDelete(req.params.id);
    if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json({ mensaje: 'Rol eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
