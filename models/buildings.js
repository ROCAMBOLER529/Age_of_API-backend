/*
+---------------------+
|                     |
| models/buildings.js |
|                     |
+---------------------+
*/


const mongoose = require('mongoose');
const { Schema } = mongoose;

const building = new Schema({
    id: Number,
    name: String,
    introduced: String,
    age: Number,
    drop_off_resources: Boolean,
    can_hold_units: Boolean,
    construction: Object,
    statistics: Object
});

const Building = mongoose.model('buildings', building);

module.exports = Building;