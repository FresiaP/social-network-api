// routa de prueba publication.js
const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");

// Definir la ruta
router.get("/prueba-publication", PublicationController.pruebaPublication);

//Exportar la ruta
module.exports = router;
