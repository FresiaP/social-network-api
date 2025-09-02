const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const UserController = require("../controllers/user");

// routa de prueba user.js
router.get("/prueba-user", UserController.pruebaUser);

// Rutas públicas
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', UserController.getUser); //Obtener usuario por ID

// Ruta protegida: obtener perfil
router.get('/profile', authMiddleware, UserController.getProfile);
router.get('/profile/me', authMiddleware, UserController.getMyProfile);


// Exportar las rutas
module.exports = router;

