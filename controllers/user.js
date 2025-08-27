const bcrypt = require('bcryptjs');
const jwtService = require("../services/jwt");
const User = require('../models/user');

// Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde controllers/user.js"
    });
};

// Metodo para registro de usuario
const register = async (req, res) => {
  try {
    const { name, surname, nick, email, password } = req.body;

    if(!name || !nick || !email || !password) {
        return res.status(400).json({ message: 'Hay campos obligatorios sin llenar'});
    }

    const userExist = await User.findOne({ $or: [{ email }, {nick}] });
    if (userExist) {
        return res.status(400).send({ message: 'El usuario ya existe.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        surname,
        nick,
        email,
        password: hashedpassword
    });

    const saveUser = await newUser.save();

    return res.status(201).json({ user: saveUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar usuario.' });
  }
};

// Método para hacer login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Faltan datos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "El usuario no existe"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = jwtService.createToken(user);

    return res.status(200).json({
        message: "Login exitoso",
        user: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            nick: user.nick,
            email: user.email
        },
        token
    });

  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: "Error al iniciar sesión"});
  }
};

// Nuevo método para obtener perfil (requiere middleware)
const getProfile = (req, res) => {
  res.json({
    message: 'Perfil de usuario',
    user: req.user
  });
};

// Exportar todas las acciones juntas
module.exports = {
    pruebaUser,
    register,
    login,
    getProfile
};