const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  codigo: { type: String, unique: true },
});

module.exports = mongoose.model('Materia', materiaSchema);
