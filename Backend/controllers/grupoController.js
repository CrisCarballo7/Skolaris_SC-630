const Grupo = require('../models/grupoModel');

// Crear nuevo grupo
const crearGrupo = async (req, res) => {
  try {
    const grupo = new Grupo(req.body);
    await grupo.save();
    res.status(201).json(grupo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear grupo' });
  }
};

// Obtener todos los grupos (con grado asociado)
const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find().populate('grado');
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener grupos' });
  }
};

// Editar grupo por ID
const actualizarGrupo = async (req, res) => {
  try {
    const grupoActualizado = await Grupo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!grupoActualizado) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }
    res.status(200).json(grupoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar grupo' });
  }
};

// Eliminar grupo por ID
const eliminarGrupo = async (req, res) => {
  try {
    await Grupo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Grupo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar grupo' });
  }
};

module.exports = {
  crearGrupo,
  obtenerGrupos,
  actualizarGrupo,
  eliminarGrupo,
};
