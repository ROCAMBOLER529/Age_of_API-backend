/*
+-------------------+
|                   |
| models/animals.js |
|                   |
+-------------------+
*/


const mongoose = require('mongoose');
const { Schema } = mongoose;

const animal = new Schema({
    id: Number,
    name: String,
    introduced: String,
    canAttack: Boolean,
    statistics: Object
});

const Animal = mongoose.model('animals', animal);

module.exports = Animal;