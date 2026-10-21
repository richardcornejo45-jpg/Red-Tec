const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // El token suele enviarse en el header bajo el formato "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Se requiere un token para esta acción.' });
  }

  try {
    // Validar el token usando la misma clave secreta del .env
    const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guardamos los datos del usuario en la petición para usarlos luego si es necesario
    req.usuario = usuarioDecodificado; 
    
    next(); // Pasa la validación, continúa a la ruta
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = { verificarToken };