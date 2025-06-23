// Asignar un rol a un usuario
exports.asignarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { rolId } = req.body;
    const Usuario = require('../models/usuarioModel');
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (!usuario.roles.includes(rolId)) {
      usuario.roles.push(rolId);
      await usuario.save();
    }
    res.json(await usuario.populate('roles','nombre'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover un rol de un usuario
exports.removerRol = async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const Usuario = require('../models/usuarioModel');
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    usuario.roles = usuario.roles.filter(r => r.toString() !== roleId);
    await usuario.save();
    res.json(await usuario.populate('roles','nombre'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
