const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
  materiaGrupoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MateriaGrupo',
    required: true,
  },
  grupoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grupo',
    required: true,
  },
  dia: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  aula: { type: String },
  comentario: { type: String },
});

module.exports = mongoose.model('Horario', horarioSchema, 'horarios');
