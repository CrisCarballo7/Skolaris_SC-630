const Materia = require('../models/materiaModel');

// Crear materia
const crearMateria = async (req, res) => {
  try {
    const nuevaMateria = new Materia(req.body);
    await nuevaMateria.save();
    res.status(201).json(nuevaMateria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la materia' });
  }
};

// Obtener todas las materias
const obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find()
      .populate('docente', 'nombre apellido email')
      .populate('estudiantes', 'nombre apellido email');
    res.status(200).json(materias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materias' });
  }
};

// Obtener materia por ID
const obtenerMateriaPorId = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id)
      .populate('docente', 'nombre apellido email')
      .populate('estudiantes', 'nombre apellido email');
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la materia' });
  }
};

// Actualizar materia
const actualizarMateria = async (req, res) => {
  try {
    const actualizada = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la materia' });
  }
};

// Eliminar materia
const eliminarMateria = async (req, res) => {
  try {
    await Materia.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Materia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la materia' });
  }
};

// Agregar estudiantes a una materia
const agregarEstudiantes = async (req, res) => {
  try {
    const { estudiantes } = req.body;
    const materia = await Materia.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { estudiantes: { $each: estudiantes } } },
      { new: true }
    );
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar estudiantes' });
  }
};

module.exports = {
  crearMateria,
  obtenerMaterias,
  obtenerMateriaPorId,
  actualizarMateria,
  eliminarMateria,
  agregarEstudiantes
};
