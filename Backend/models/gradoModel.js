const mongoose = require('mongoose');

const gradoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nivel: { type: Number, required: true },
  descripcion: String,
});

module.exports = mongoose.model('Grado', gradoSchema);
