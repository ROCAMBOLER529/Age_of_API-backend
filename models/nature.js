/*
+-------------------+
|                   |
| models/animals.js |
|                   |
+-------------------+
*/


const mongoose = require('mongoose');
const { Schema } = mongoose;

const nature = new Schema({
    id: Number,
    name: String,
    introduced: String,
    hp: Number,
    resources: Object
});

const Nature = mongoose.model('nature', nature);

module.exports = Nature;