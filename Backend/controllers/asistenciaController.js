const Asistencia = require('../models/asistenciaModel');

// Crear una nueva asistencia
exports.crearAsistencia = async (req, res) => {
  try {
    const { estudiante, clase, fecha, presente } = req.body;
    if (!estudiante || !clase) {
      return res.status(400).json({ error: 'Estudiante y clase son obligatorios' });
    }
    const asis = new Asistencia({ estudiante, clase, fecha, presente });
    await asis.save();
    // Populamos el estudiante para devolver su info
    await asis.populate('estudiante', '-contrasena');
    res.status(201).json(asis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas las asistencias
exports.obtenerAsistencias = async (req, res) => {
  try {
    const lista = await Asistencia.find()
      .populate('estudiante', '-contrasena');
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una asistencia por ID
exports.actualizarAsistencia = async (req, res) => {
  try {
    const updates = (({ clase, fecha, presente }) => ({ clase, fecha, presente }))(req.body);
    const asis = await Asistencia.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate('estudiante', '-contrasena');
    if (!asis) return res.status(404).json({ error: 'Asistencia no encontrada' });
    res.json(asis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una asistencia por ID
exports.eliminarAsistencia = async (req, res) => {
  try {
    const asis = await Asistencia.findByIdAndDelete(req.params.id);
    if (!asis) return res.status(404).json({ error: 'Asistencia no encontrada' });
    res.json({ mensaje: 'Asistencia eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
