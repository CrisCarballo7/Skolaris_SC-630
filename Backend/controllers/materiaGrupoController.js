const MateriaGrupo = require('../models/materiaGrupoModel');

// Crear asignación
const crearMateriaGrupo = async (req, res) => {
  try {
    const mg = new MateriaGrupo(req.body);
    await mg.save();
    res.status(201).json(mg);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar materia a grupo' });
  }
};

// Obtener todas las asignaciones
const obtenerMateriasGrupos = async (req, res) => {
  try {
    const asignaciones = await MateriaGrupo.find()
      .populate('materia')
      .populate('grupo')
      .populate('docente', '-contrasena');
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asignaciones' });
  }
};

// Obtener asignación por ID
const obtenerMateriaGrupoPorId = async (req, res) => {
  try {
    const mg = await MateriaGrupo.findById(req.params.id)
      .populate('materia')
      .populate('grupo')
      .populate('docente', '-contrasena');

    if (!mg) return res.status(404).json({ error: 'Asignación no encontrada' });
    res.status(200).json(mg);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar asignación' });
  }
};

// Actualizar asignación
const actualizarMateriaGrupo = async (req, res) => {
  try {
    const mg = await MateriaGrupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mg) return res.status(404).json({ error: 'Asignación no encontrada' });
    res.status(200).json(mg);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar asignación' });
  }
};

// Eliminar asignación
const eliminarMateriaGrupo = async (req, res) => {
  try {
    await MateriaGrupo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Asignación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar asignación' });
  }
};

module.exports = {
  crearMateriaGrupo,
  obtenerMateriasGrupos,
  obtenerMateriaGrupoPorId,
  actualizarMateriaGrupo,
  eliminarMateriaGrupo,
};
