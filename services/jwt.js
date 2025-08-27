const jwt = require("jwt-simple");
const moment = require("moment");

// Usar la clave desde el .env
const secret = process.env.JWT_SECRET;

const createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix()
    };

    return jwt.encode(payload, secret);
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.decode(token, secret);
        if (decoded.exp <= moment().unix()) return null;
        return decoded;
    } catch (err) {
        return null;
    }
};

module.exports = { createToken, verifyToken };