const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
  docenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  grado: { type: String, required: true },
  dia: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  aula: { type: String },
  comentario: { type: String } 
});

module.exports = mongoose.model('Horario', horarioSchema, 'horarios');

