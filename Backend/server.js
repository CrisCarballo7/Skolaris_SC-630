require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // <-- Importa aquí tus rutas de usuario
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', usuarioRoutes);   // <-- Monta las rutas de usuario aquí

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
