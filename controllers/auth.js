/*
+---------------------+
|                     |
| controllers/auth.js |
|                     |
+---------------------+
*/

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { sendResponse } = require('../helpers/functions');

const logIn = async (req, res) => {
    const { nombre } = req.body;

    const usuario = await Usuario.find().exec();

    const user = usuario.find(x => x.name == nombre);
    const token = await generarJWT(nombre);

    sendResponse(res, {user, token});
}

const generarJWT = nombre => {
    return new Promise((resolve, reject) => {
        const payload = { nombre }
        jwt.sign(payload, process.env.TOKEN, { expiresIn: '12h' }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        }) 
    })
}

module.exports = { logIn };
