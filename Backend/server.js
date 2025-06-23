const express = require('express');
const app = express(); // <-- Esto debe ir antes de usar `app`
require('dotenv').config();

const connectDB = require('./config/db');

// Importar rutas existentes
const authRoutes           = require('./routes/authRoutes');
const usuarioRoutes        = require('./routes/usuarioRoutes');
const horarioRoutes        = require('./routes/horarioRoutes');
const gradoRoutes          = require('./routes/gradoRoutes');
const grupoRoutes          = require('./routes/grupoRoutes');
const materiaRoutes        = require('./routes/materiaRoutes');
const materiaGrupoRoutes   = require('./routes/materiaGrupoRoutes');

// Importar rutas SCRUM-5 y SCRUM-14
const rolRoutes            = require('./routes/rolRoutes');
const asistenciaRoutes     = require('./routes/asistenciaRoutes');

const cors = require('cors');
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/auth',           authRoutes);
app.use('/api/usuarios',       usuarioRoutes);

// SCRUM-5: gestión de Roles
app.use('/api/roles',          rolRoutes);

// SCRUM-14: gestión de Asistencias
app.use('/api/asistencias',    asistenciaRoutes);

// Rutas de tu módulo de clases, grados, etc.
app.use('/api/horarios',       horarioRoutes);
app.use('/api/grados',         gradoRoutes);
app.use('/api/grupos',         grupoRoutes);
app.use('/api/materias',       materiaRoutes);
app.use('/api/materiasGrupos', materiaGrupoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
