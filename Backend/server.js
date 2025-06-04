const express = require('express');
const app = express(); // <-- Esto debe ir antes de usar `app`

require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // nombre correcto

const cors = require('cors');
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes); // ✅ ahora la ruta será /api/usuarios/...

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
