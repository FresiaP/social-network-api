const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

// routa de prueba user.js
router.get("/prueba-user", UserController.pruebaUser);


// Exportar las rutas
module.exports = router;

