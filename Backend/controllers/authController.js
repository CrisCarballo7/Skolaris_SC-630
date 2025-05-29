const User = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO DE USUARIO
exports.register = async (req, res) => {
  try {
    const { email, contrasena, password, rol } = req.body;
    const inputPassword = contrasena || password;

    // Validaciones por tipo de correo
    if (rol === 'Estudiante' && !email.endsWith('@est.mep.go.cr')) {
      return res.status(400).json({ message: 'Email inválido para estudiante' });
    }
    if (rol === 'Docente' && !email.endsWith('@mep.go.cr')) {
      return res.status(400).json({ message: 'Email inválido para docente' });
    }
    if (rol === 'Admin' && email !== 'skolaris@gmail.com') {
      return res.status(400).json({ message: 'Email inválido para admin' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(inputPassword, 10);

    const newUser = new User({ email, contrasena: hashedPassword, rol });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN DE USUARIO
exports.login = async (req, res) => {
  try {
    const { email, contrasena, password } = req.body;
    const inputPassword = contrasena || password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(inputPassword, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol, email: user.email },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    // Envía datos completos menos contrasena
    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        cedula: user.cedula,
        fechaNacimiento: user.fechaNacimiento,
        edad: user.edad,
        direccion: user.direccion,
        email: user.email,
        rol: user.rol,
        grado: user.grado,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
