/*
+-------------------------+
|                         |
| models/civilizations.js |
|                         |
+-------------------------+
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const civilization = new Schema({
    id: Number,
    name: Object,
    information: Object,
    bonuses: Object,
    ai_players_names: Array,
    units: Object,
    buildings: Object,
    tech: Object
});

const Civ = mongoose.model('civilization', civilization);

module.exports = Civ;