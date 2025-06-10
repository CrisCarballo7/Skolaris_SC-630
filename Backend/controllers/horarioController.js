const Horario = require('../models/horarioModel');

// Crear
const crearHorario = async (req, res) => {
  try {
    const nuevoHorario = new Horario(req.body);
    await nuevoHorario.save();
    res.status(201).json(nuevoHorario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el horario' });
  }
};

// Obtener todos
const obtenerHorarios = async (req, res) => {
  try {
    let horarios;

    if (req.user.rol === 'Estudiante') {
      const grupo = req.user.grado;
      if (!grupo) {
        return res.status(400).json({ error: 'El usuario no tiene grado definido' });
      }

      horarios = await Horario.find({ grupo }).populate('docenteId', 'nombre apellido email');

    } else if (req.user.rol === 'Docente') {
      horarios = await Horario.find({ docenteId: req.user.id }).populate('docenteId', 'nombre apellido email');

    } else {
      // Admin
      horarios = await Horario.find().populate('docenteId', 'nombre apellido email');
    }

    res.status(200).json(horarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los horarios' });
  }
};



// Obtener por ID
const obtenerHorarioPorId = async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id).populate('docenteId');
    if (!horario) return res.status(404).json({ error: 'Horario no encontrado' });
    res.status(200).json(horario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el horario' });
  }
};

// Editar
const actualizarHorario = async (req, res) => {
  try {
    const actualizado = await Horario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el horario' });
  }
};

// Eliminar
const eliminarHorario = async (req, res) => {
  try {
    await Horario.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Horario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el horario' });
  }
};

module.exports = {
  crearHorario,
  obtenerHorarios,
  obtenerHorarioPorId,
  actualizarHorario,
  eliminarHorario
};