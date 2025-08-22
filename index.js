require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection"); // Tu archivo de conexión

// Mensaje de bienvenida
console.log("API NODE para RED SOCIAL arrancada!!");

// Conexión a Base de Datos
connectDB(process.env.MONGO_URI);

// Crear servidor node
const app = express();
const puerto = 3900;

// Configurar Cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extends: true}));

// Importar Rutas
const UserRoutes = require("./routes/user");
const FollowRoutes = require("./routes/follow");
const PublicationRoutes = require("./routes/publication");

//Cargar Rutas
app.use("/api/user", UserRoutes);
app.use("/api/follow", FollowRoutes);
app.use("/api/publication", PublicationRoutes);

// Ruta de prueba
app.get("/ruta-prueba", (req, res) => {

    return  res.status(200).json(
      {
        "id":1,
        "nombre": "Fresia",
        "web": "Fresia.ni"
      }
    );
})


// Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto);
});