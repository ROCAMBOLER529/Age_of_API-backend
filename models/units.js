/*
+-----------------+
|                 |
| models/units.js |
|                 |
+-----------------+
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const unit = new Schema({
    id: Number,
    name: String,
    introduced: String,
    type: String,
    age: Number,
    training: Object,
    statistics: Object
});

const Unit = mongoose.model('units', unit);

module.exports = Unit;