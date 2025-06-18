const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: String,
  fechaNacimiento: Date,
  edad: Number,
  direccion: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  contrasena: { type: String, required: true },
  rol: String,
  grado: String,
  forzarCambioContrasena: Boolean,
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios');
