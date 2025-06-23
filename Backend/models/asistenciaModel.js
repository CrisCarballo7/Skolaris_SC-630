const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  clase: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  presente: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Asistencia', AsistenciaSchema);
