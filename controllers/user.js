const bcrypt = require('bcryptjs');
const jwtService = require("../services/jwt");
const User = require('../models/user');


// Acciones de prueba
// Prueba user
const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde controllers/user.js"
    });
};

// Metodo para registro de usuario
const register = async (req, res) => {
try{
    const { name, surname, nick, email, password } = req.body;

    // Validar que no falten campos
    if(!name || !nick ||!email || !password) {
        return res.status(400).json({ message: 'Hay campos obligatorios sin llenar'})
    }

    // Comprobar si el usuario ya existe
    const userExist = await User.findOne({ $or: [{ email }, {nick}] });
    if (userExist) {
        return res.status(400).send({
            message: 'El usuario ya existe.'
        });
    }

    //Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const newUser = new User({
        name,
        surname,
        nick,
        email,
        password: hashedpassword
    });

    // Guardar en la DB
    const saveUser = await newUser.save();

    // Respuesta
    return res.status(201).json({ user: saveUser});

} catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al registrar usuario.' });
    }

};

// Método para hacer login
const login = async (req, res) => {
    try{

    const { email, password } = req.body;

    // Validar que vengan los campos
     if(!email || !password){
        return res.status(400).json({ message: "Faltan datos" });
     } 
     
     // Buscar usuario por email
     const user = await User.findOne({ email});
     if (!user) {
        return res.status(404).json({ message: "El usuario no existe"});
     }

     // Comprobar contraseña
     const validPassword = await bcrypt.compare(password, user.password);
     if(!validPassword) {
        return res.status(400).json({ message: "Credenciales incorrectas" });
     }

     // Generar token con la función del servicio
     const token = jwtService.createToken(user);

     // Responder
     return res.status(200).json({
        message: "Login exitoso",
        user: {
            id: user._id,
            name: user.name,
            surname:user.surname,
            nick: user.nick,
            email: user.email
        },
        token
     });


    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Error al iniciar sesión"});
    }

};

//Exportar acciones
module.exports = {
    pruebaUser,
    register,
    login
};