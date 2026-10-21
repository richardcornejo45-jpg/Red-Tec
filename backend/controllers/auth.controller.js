const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar si el usuario existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Verificar la contraseña
    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // 3. Generar el Token (JWT)
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol }, // Datos que guardamos en el token
      process.env.JWT_SECRET,               // La firma secreta del .env
      { expiresIn: '8h' }                   // El token caduca en 8 horas
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }
    });

 } catch (error) {
    console.log(error); // <-- Agrega esto para ver el error real en la terminal
    res.status(500).json({ error: error.message }); // <-- Muestra el error en Postman
  }
};

module.exports = { login };