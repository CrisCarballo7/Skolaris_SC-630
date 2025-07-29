const Usuario = require('../models/usuarioModel');
const MateriaGrupo = require('../models/materiaGrupoModel');
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
// Obtener todos
const obtenerHorarios = async (req, res) => {
  try {
    let horarios;

    if (req.user.rol === 'Estudiante') {
      const grupo = req.user.grupo;
      if (!grupo) {
        return res.status(400).json({ error: 'El usuario no tiene grupo definido' });
      }

      const materiaGrupos = await MateriaGrupo.find({ grupo: grupo }).select('_id');
      const idsMateriaGrupo = materiaGrupos.map(mg => mg._id);

      horarios = await Horario.find({ materiaGrupoId: { $in: idsMateriaGrupo } })
        .populate({
          path: 'materiaGrupoId',
          populate: [
            { path: 'materia' },
            { path: 'grupo' },
            { path: 'docente', select: 'nombre apellido email' }
          ]
        });

    } else if (req.user.rol === 'Docente') {
      const materiaGrupos = await MateriaGrupo.find({ docente: req.user.id }).select('_id');
      const ids = materiaGrupos.map(mg => mg._id);

      horarios = await Horario.find({ materiaGrupoId: { $in: ids } })
        .populate({
          path: 'materiaGrupoId',
          populate: [
            { path: 'materia', select: 'nombre' },
            { path: 'grupo', select: 'nombre' },
            { path: 'docente', select: 'nombre apellido email' }
          ]
        });

    } else {
      // Admin
      horarios = await Horario.find()
        .populate({
          path: 'materiaGrupoId',
          populate: [
            { path: 'materia', select: 'nombre' },
            { path: 'grupo', select: 'nombre' },
            { path: 'docente', select: 'nombre apellido email' }
          ]
        })
        .populate('grupoId', 'nombre')
        .sort({ dia: 1, horaInicio: 1 });
    }

    res.status(200).json(horarios);
  } catch (err) {
    console.error('[ERROR] al obtener horarios:', err);
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


const obtenerHorarioEstudiante = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Usuario.findById(id);
    if (!estudiante || estudiante.rol !== 'Estudiante') {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    const materiaGrupos = await MateriaGrupo.find({ grupo: estudiante.grupo }).select('_id');
    const idsMateriaGrupo = materiaGrupos.map(mg => mg._id);

    const horarios = await Horario.find({ materiaGrupo: { $in: idsMateriaGrupo } })
      .populate({
        path: 'materiaGrupo',
        populate: [
          { path: 'materia' },
          { path: 'docente', select: 'nombre apellido' },
          { path: 'grupo', select: 'nombre' }
        ]
      });

    res.json({ horarios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerBloquesPorGrupo = async (req, res) => {
  try {
    const { grupoId } = req.params;

    const horarios = await Horario.find({ grupoId })
      .populate({
        path: 'materiaGrupoId',
        populate: [
          { path: 'materia', select: 'nombre' },
          { path: 'docente', select: 'nombre apellido' }
        ]
      })
      .sort({ dia: 1, horaInicio: 1 });

    const bloques = horarios.map(h => ({
      dia: h.dia,
      horaInicio: h.horaInicio,
      horaFin: h.horaFin,
      aula: h.aula,
      materia: h.materiaGrupoId?.materia?.nombre || 'Desconocido',
      docente: h.materiaGrupoId?.docente
        ? `${h.materiaGrupoId.docente.nombre} ${h.materiaGrupoId.docente.apellido}`
        : 'No asignado',
    }));

    res.status(200).json(bloques);
  } catch (error) {
    console.error('[ERROR] al obtener bloques:', error);
    res.status(500).json({ error: 'Error al obtener horarios por bloques' });
  }
};


module.exports = {
  crearHorario,
  obtenerHorarios,
  obtenerHorarioPorId,
  actualizarHorario,
  eliminarHorario,
  obtenerHorarioEstudiante,
  obtenerBloquesPorGrupo
};