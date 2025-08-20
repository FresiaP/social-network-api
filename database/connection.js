const mongoose = require("mongoose");

// URL de conexión a MongoDB
const dbURI = 'mongodb://127.0.0.1:27017/social_network';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conexión a MongoDB/social_network exitosa');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si falla la conexión
  }
};

module.exports = connectDB;
