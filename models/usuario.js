/*
+--------------------+
|                    |
| models/usuario.js |
|                    |
+--------------------+
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuario = new Schema({
    name: String,
    password: String,
    rol: String,
    banned: Boolean
});

const Usuario = mongoose.model('usuarios', usuario);

module.exports = Usuario;