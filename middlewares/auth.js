/*
+---------------------+
|                     |
| middlewares/auth.js |
|                     |
+---------------------+
*/

const jwt = require('jsonwebtoken');
const { getUsuariosByToken } = require('../controllers/usuario');

const esAdmin = (req, res, next) => {
    let { usuario } = req.body

    if (!usuario) {
        res.status(500).json({
            log: "Token should be validated first"
        })
    } else {
        const { nombre, rol } = req.usuario;

        if (rol != "adm") {
            res.status(401).json({
                log: `${nombre} is not admin`
            });
        } else {
            next();
        }
    }
}

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    const { nombre } = req.body;

    try {
        const { nombreUser } = jwt.verify(token, process.env.TOKEN);
        const usuarioExistente = getUsuariosByToken(nombre);

        if (usuarioExistente) {
            req.usuario = usuarioExistente;
            next();
        } else {
            res.status(401).json({
                log: `No existe el usuario ${req.body.nombre}`
            });
        }
    } catch(e) {
        res.status(500).json({
            e,
            log: "Invalid token"
        })
    }
}

module.exports = {
    esAdmin,
    validarJWT
}
