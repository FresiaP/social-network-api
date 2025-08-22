const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

// routa de prueba user.js
router.get("/prueba-user", UserController.pruebaUser);
router.post('/register', UserController.register);


// Exportar las rutas
module.exports = router;

