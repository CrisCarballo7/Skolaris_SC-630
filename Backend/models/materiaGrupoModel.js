



//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//
//-- Este es el modelo intermedio que conecta Materia, Grupo y Docente --//
//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//




const mongoose = require('mongoose');

const materiaGrupoSchema = new mongoose.Schema({
  materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true },
  grupo: { type: mongoose.Schema.Types.ObjectId, ref: 'Grupo', required: true },
  docente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  anio: Number,
  periodo: String // Ej: "I", "II", "III"
});

module.exports = mongoose.model('MateriaGrupo', materiaGrupoSchema);

