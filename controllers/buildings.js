/*
+--------------------------+
|                          |
| controllers/buildings.js |
|                          |
+--------------------------+
*/

const Building = require("../models/buildings");
const { replaceChar, sendResponse } = require('../helpers/functions');

// --------
// GET
// --------

const getAllBuildings = async (req, res) => {
    const buildings = await Building.find().exec();

    sendResponse(res, buildings.map(x => x.name));
}

const getBuildingByName = async (req, res) => {
    let { name } = req.params
    
    name = replaceChar("-", " ", name);
    const buildings = await Building.findOne({ name }).exec();

    sendResponse(res, buildings);
}

const getBuildingsByIntroduced = async (req, res) => {
    let { introduced } = req.params
    
    introduced = replaceChar("-", " ", introduced);
    console.log(introduced);
    
    const buildings = await Building.find({ introduced }).exec();

    sendResponse(res, buildings.map(x => x.name));
}

const getBuildingsByType = async (req, res) => {
    let { type } = req.params
    
    const buildings = await Building.find({ type }).exec();

    sendResponse(res, buildings.map(x => x.name));
}

const getBuildingsByAge = async (req, res) => {
    let { age } = req.params
    
    const buildings = await Building.find({ age }).exec();

    sendResponse(res, buildings.map(x => x.name));
}

const getBuildingsByResource = async (req, res) => {
    let { resource } = req.params;

    resource = resource.toLowerCase();
    const buildings = await Building.find();
    const aux = buildings.filter(x => x.construction != undefined);
    console.log(aux);
    const filteredBuildings = aux.filter(x => x.construction.resources.hasOwnProperty(resource));

    sendResponse(res, filteredBuildings.map(x => x.name));
}

// --------
// POST
// --------

const addPlainBuilding = async (req, res) => {
    let { name, type, introduced, age } = req.body;

    const amount = await Building.find();
    const id = amount.length + 20001;

    const building = new Building({
        id,
        name,
        type,
        introduced,
        age: parseInt(age),
        drop_off_resources: false,
        can_hold_units: false,
        construction: {
            resources: {
                wood: 0
            },
            time_in_seconds: 0
        },
        statistics: {
            size: {
                width: 0,
                height: 0 
            },
            hp: 0,
            melee_armor: 0,
            pierce_armor: 0,
            line_of_sight: 0
        }
    });

    try {
        await building.save();
        res.json(building);
    } catch(e) {
        res.json(e);
    }
}

const addSimpleBuilding = async (req, res) => {
    let { name, type, introduced, age, drop_off_resources, can_hold_units, food, wood, stone, gold, time_in_seconds, width, height, hp, melee_armor, pierce_armor, line_of_sight} = req.body;

    const amount = await Building.find();
    const id = amount.length + 20001;

    const building = new Building({
        id,
        name,
        type,
        introduced,
        age: parseInt(age),
        drop_off_resources,
        can_hold_units,
        construction: {
            resources: {
                food: parseInt(food),
                wood: parseInt(wood),
                stone: parseInt(stone),
                gold: parseInt(gold)
            },
            time_in_seconds: parseInt(time_in_seconds)
        },
        statistics: {
            size: {
                width: parseInt(width),
                height: parseInt(height) 
            },
            hp: parseInt(hp),
            melee_armor: parseInt(melee_armor),
            pierce_armor: parseInt(pierce_armor),
            line_of_sight: parseInt(line_of_sight)
        }
    });

    try {
        await building.save();
        res.json(building);
    } catch(e) {
        res.json(e);
    }
}

const updateNameOfBuilding = async (req, res) => {
    const { nombre } = req.params;
    const { name } = req.body;

    const building = await Building.updateOne({ name: nombre }, { name });

    if (building) {
        res.json(building);    
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const updateStatsOfBuilding = async (req, res) => {
    let { nombre } = req.params;
    let { width, height, hp, melee_armor, pierce_armor, line_of_sight } = req.body;
    const cambio = {
        size: {
            width: parseInt(width), 
            height: parseInt(height),
        },
        hp: parseInt(hp), 
        melee_armor: parseInt(melee_armor), 
        pierce_armor: parseInt(pierce_armor), 
        line_of_sight: parseInt(line_of_sight)
    }

    const building = await Building.updateOne({ name: nombre }, { statistics: cambio });
    
    if (building) {
        res.json(building);    
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const clearBuilding = async (req, res) => {
    const { nombre } = req.params;

    const cambio = {
        type: null,
        introduced: null,
        age: 0,
        drop_off_resources: false,
        can_hold_units: false,
        construction: {
            resources: null,
            time_in_seconds: null
        },
        statistics: null
    }
    
    const building = await Building.updateOne({ name: nombre }, cambio);

    if (building) {
        res.json(building);    
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const deleteBuilding = async (req, res) => {
    let { name } = req.params;

    const building = await Building.deleteOne({ name });
    res.json(building);
}

const deleteAllBuildingByAge = async (req, res) => {
    let { age } = req.params;

    const building = await Building.deleteMany({ age });

    if (building) {
        res.json(building);    
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

module.exports = {
    getAllBuildings,
    getBuildingByName,
    getBuildingsByIntroduced,
    getBuildingsByType,
    getBuildingsByAge,
    getBuildingsByResource,

    addPlainBuilding,
    addSimpleBuilding,

    updateNameOfBuilding,
    updateStatsOfBuilding,
    clearBuilding,

    deleteBuilding,
    deleteAllBuildingByAge
}