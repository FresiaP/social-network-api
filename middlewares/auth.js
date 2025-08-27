const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Los tokens suelen venir en el header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1]; // quitamos "Bearer"

    // Verificamos el token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos la info del usuario en req.user
    req.user = decoded;

    next(); // seguimos al siguiente middleware/controlador

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;

