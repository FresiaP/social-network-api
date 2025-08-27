const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const UserController = require("../controllers/user");

// routa de prueba user.js
router.get("/prueba-user", UserController.pruebaUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Ruta protegida: obtener perfil
router.get('/profile', authMiddleware, UserController.getProfile);


// Exportar las rutas
module.exports = router;

