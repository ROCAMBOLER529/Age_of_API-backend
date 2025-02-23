/*
+------------------------+
|                        |
| controllers/usuario.js |
|                        |
+------------------------+
*/

const Usuario = require("../models/usuario");
const { replaceChar, sendResponse } = require('../helpers/functions');

// --------
// GET
// --------

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find().exec();

    if (usuarios) {
        res.json(usuarios);
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const getUsuariosByName = async (req, res) => {
    let { name } = req.params;
    
    const usuario = await Usuario.find({ name }).exec();

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const getUsuariosByRol = async (req, res) => {
    let { rol } = req.params;

    const usuario = await Usuario.find({ rol }).exec();

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const getUsuariosByBan = async (req, res) => {
    const usuario = await Usuario.find({ banned: true }).exec();

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const getUsuariosByToken = async (nombre) => {
    const usuarios = await Usuario.find({ name: nombre });
    console.log(usuarios);
    return usuarios.name;
}

// --------
// POST
// --------

const addUsuario = async (req, res) => {
    const { name, password, rol } = req.body;
    console.log(name);
    console.log(password);
    console.log(rol);    

    const usuarios = new Usuario({
        name,
        password,
        rol
    });

    try {
        await usuarios.save();
        res.json({
            name,
            rol
        });
    } catch(e) {
        console.log(e);
        res.json("oops!");
    }
}

// --------
// PUT
// --------

const updateUsuario = async (req, res) => {
    const { nombre } = req.params;
    const cambio = req.body;

    const usuario = await Usuario.updateOne({ name: nombre }, cambio).exec();

    if (usuario) {
        res.json({
            nombre,
            cambio
        });
    } else {
        res.status(404).json({
            log: "Not found"
        })
    }

}

const banUsuario = async (req, res) => {
    const { name } = req.params;

    const usuario = await Usuario.updateOne({ name }, { banned: true }).exec();

    if (usuario) {
        res.json({usuario});
    } else {
        res.status(404).json({
            log: "Not found"
        })
    }
}

const unbanUsuario = async (req, res) => {
    const { name } = req.params;
    
    const usuario = await Usuario.updateOne({ name }, { banned: false }).exec();

    sendResponse(res, usuario);
}

const promoteUsuario = async (req, res) => {
    const { name } = req.params;
    
    const usuario = await Usuario.updateOne({ name }, { rol: "mod" }).exec();

    sendResponse(res, usuario);
}

const demoteUsuario = async (req, res) => {
    const { name } = req.params;
    
    const usuario = await Usuario.updateOne({ name }, { rol: "std" }).exec();

    sendResponse(res, usuario);
}

// --------
// DELETE
// --------

const deleteUsuario = async (req, res) => {
    const { name } = req.params;

    const usuario = await Usuario.deleteOne({ name });

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            log: "Not found"
        })
    }
}

module.exports = { getUsuarios, 
                   getUsuariosByName, 
                   getUsuariosByRol, 
                   getUsuariosByBan,
                   getUsuariosByToken,

                   addUsuario,

                   updateUsuario,
                   banUsuario,
                   unbanUsuario,
                   promoteUsuario,
                   demoteUsuario,

                   deleteUsuario
                 };