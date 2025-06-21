const express = require('express');
const app = express(); // <-- Esto debe ir antes de usar `app`

require('dotenv').config();
//importando rutas
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // nombre correcto
const horarioRoutes = require('./routes/horarioRoutes'); // horarios
const gradoRoutes = require('./routes/gradoRoutes'); //ruta grados
const grupoRoutes = require('./routes/grupoRoutes'); //ruta grupos
const materiaRoutes = require('./routes/materiaRoutes'); //ruta materias
const materiaGrupoRoutes = require('./routes/materiaGrupoRoutes'); //ruta materiaporgrupo


const cors = require('cors');
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());

// montando las Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes); // ✅ ahora la ruta será /api/usuarios/...
app.use('/api', horarioRoutes); //ruta para horario
app.use('/api/grados', gradoRoutes); //ruta para grado
app.use('/api/grupos', grupoRoutes); //ruta para grupos
app.use('/api/materias', materiaRoutes); //ruta para materias
app.use('/api/materiasGrupos', materiaGrupoRoutes); //ruta para materiasgrupos

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});



