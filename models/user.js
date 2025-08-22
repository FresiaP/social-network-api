// Importar mongoose
const mongoose = require("mongoose");
const { Schema, model } = mongoose;


// Definir el esquema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    nick: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    image: {
        type: String,
        default: null
    }
}, { timestamps: true }); //crea automaticamente createdAt y updatedAt

// Exportar el modelo
   module.exports = mongoose.model('User', UserSchema, "users");

                                                       //colección: users     