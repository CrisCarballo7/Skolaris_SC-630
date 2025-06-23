const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  // …tus otros campos (nombre, email, etc.)
+ roles: [{
+   type: mongoose.Schema.Types.ObjectId,
+   ref: 'Rol'
+ }],
  // si aún usas el enum simple de rol:
  rol: {
    type: String,
    enum: ['Admin','Docente','Estudiante'],
    required: true
  },
  // … resto de campos
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios');
