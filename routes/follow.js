const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");


// routa de prueba user.js
router.get("/prueba-follow", FollowController.pruebaFollow)

// Exportar las rutas
module.exports = router