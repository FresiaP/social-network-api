const jwt = require("jwt-simple");
const moment = require("moment");

const secret = "CLAVE_SECRETA_del_proyecto_DE_LA_RED_SoCial_987987";

// Función para crear token
const createToken = (user) => {
    const payload = {
        sub: user._id,                     // id del usuario
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        image: user.image,
        iat: moment().unix(),              // fecha de emisión
        exp: moment().add(7, "days").unix() // expiración en 7 días
    };

    // Devolver token codificado
    return jwt.encode(payload, secret);
};

// Función para verificar token
const verifyToken = (token) => {
    try {
        const decoded = jwt.decode(token, secret);

        // Comprobar expiración
        if (decoded.exp <= moment().unix()) {
            return null; // token expirado
        }

        return decoded; // token válido
    } catch (err) {
        return null; // token inválido
    }
};

module.exports = { createToken, verifyToken };