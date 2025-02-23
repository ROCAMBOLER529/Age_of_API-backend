/*
+----------------------+
|                      |
| controllers/units.js |
|                      |
+----------------------+
*/

const Unit = require("../models/units");
const { replaceChar, sendResponse, setIdForElement } = require("../helpers/functions");

// --------
// GET
// --------

const getUnits = async (req, res) => {
    const units = await Unit.find().exec();

    sendResponse(res, units);
}

const getUnitByName = async (req, res) => {
    let { name } = req.params;

    introduced = replaceChar("-", " ", introduced);
    const units = await Unit.findOne({ name }).exec();

    sendResponse(res, units);
}

const getUnitByRelease = async (req, res) => {
    let { introduced } = req.params;

    introduced = replaceChar("-", " ", introduced);
    const units = await Unit.find({ introduced }).exec();

    sendResponse(res, units.map(x => x.name));
}

const getUnitByAge = async (req, res) => {
    let { age } = req.params;

    const units = await Unit.find({ age }).exec();

    sendResponse(res, units.map(x => x.name));
}

const getUnitsByResource = async (req, res) => {
    let { resource } = req.params;

    const units = await Unit.find().exec();
    const possibleUnits = units.filter(x => x["training"] && x["training"]["resources"] && x["training"]["resources"][resource]);

    sendResponse(res, possibleUnits.map(x => x.name));
}

// --------
// POST
// --------

const addUnit = async (req, res) => {
    let { name, introduced, age, is_hero, trained_at, food, wood, stone, gold, time_in_seconds, hp, rate, melee_armor, pierce_armor, speed, line_of_sight} = req.body;
    
    const units = await Unit.find().exec();
    const id = setIdForElement(units, 10000);
    console.log(id);
    

    const unit = new Unit({
        id: parseInt(id),
        name,
        introduced,
        age,
        training: (is_hero) ? null : {
            trained_at: parseInt(trained_at),
            resources: {
                food: parseInt(food),
                wood: parseInt(wood),
                stone: parseInt(stone),
                gold: parseInt(gold)
            },
            time_in_seconds: parseInt(time_in_seconds)
        },
        statistics: {
            hp: parseInt(hp),
            rate: parseFloat(rate),
            melee_armor: parseInt(melee_armor),
            pierce_armor: parseInt(pierce_armor),
            speed: parseFloat(speed),
            line_of_sight: parseInt(line_of_sight)
        }

    });

    try {
        await unit.save();
        res.json(unit);
    } catch(e) {
        console.log(e);
        res.json({
            "status": "failed"
        });
    }
}

// --------
// PUT
// --------

const updateStatsOfUnit = async (req, res) => {
    let { nombre } = req.params;
    let { hp, rate, melee_armor, pierce_armor, speed, line_of_sight } = req.body;
    const cambio = {
        hp,
        rate,
        melee_armor,
        pierce_armor,
        speed,
        line_of_sight
    }

    console.log(cambio); 

    const units = await Unit.findOneAndUpdate({
        name: nombre,
        statistics: cambio,
        new: true
    });
    
    sendResponse(res, units);
}

const updateInfoOfUnit = async (req, res) => {
    let { nombre } = req.params;
    let { name, introduced, type, age } = req.body;

    const unit = await Unit.findOneAndUpdate({
        name: nombre,
        $set: {
            name,
            introduced,
            type,
            age
        },
        new: true
    });

    sendResponse(res, unit);
}

// --------
// DELETE
// --------

const deleteUnit = async (req, res) => {
    let { name } = req.params;

    const units = await Unit.deleteOne({ name });
    
    sendResponse(res, units);
}

module.exports = { getUnits,
                   getUnitByName,
                   getUnitByRelease,
                   getUnitByAge,
                   getUnitsByResource,

                   addUnit,

                   updateStatsOfUnit,
                   updateInfoOfUnit,

                   deleteUnit
}