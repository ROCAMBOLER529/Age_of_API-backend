/*
+----------------+
|                |
| models/tech.js |
|                |
+----------------+
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const tech = new Schema({
    id: Number,
    name: String,
    introduced: String,
    age: Number,
    image: String,
    effects: String,
    research: Object,
    time_in_seconds: Number
});

const Tech = mongoose.model('tech', tech);

module.exports = Tech;