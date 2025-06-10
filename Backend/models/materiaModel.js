const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  grado: { type: String, required: true }, // sección
  docente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  estudiantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
});

module.exports = mongoose.model('Materia', materiaSchema);
