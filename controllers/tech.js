/*
+---------------------+
|                     |
| controllers/tech.js |
|                     |
+---------------------+
*/

const Tech = require('../models/tech');
const { replaceChar, sendResponse } = require('../helpers/functions');
const { getBuilding } = require('../helpers/getter'); 

// --------
// GET
// --------

const getAllTech = async (req, res) => {
    const tech = await Tech.find().exec();

    sendResponse(res, tech.map(x => x.name));
}

const getTechByName = async (req, res) => {
    let { name } = req.params;
    
    name = replaceChar("-", " ", name);
    const tech = await Tech.find({ name });

    sendResponse(res, tech);
}

const getTechByRelease = async (req, res) => {
    let { introduced } = req.params;

    introduced = replaceChar("-", " ", introduced);
    const tech = await Tech.find({ introduced });

    sendResponse(res, tech.map(x => x.name)); 
}

const getTechByAge = async (req, res) => {
    let { age } = req.params;

    const tech = await Tech.find({ age });

    sendResponse(res, tech.map(x => x.name)); 
}

const getTechByResource = async (req, res) => {
    let { resource } = req.params;

    const tech = await Tech.find();
    const techWithResource = tech.filter(x => x.research.resources.hasOwnProperty(resource));

    sendResponse(res, techWithResource.map(x => x.name)); 
}

const getTechByBuilding = async (req, res) => {
    let { building } = req.params;
    const idOfBuilding = await getBuilding(building);
    console.log(idOfBuilding);        

    const tech = await Tech.find().exec();
    const techFiltrados = tech.filter(x => x.research.at == idOfBuilding);

    sendResponse(res, techFiltrados.map(x => x.name)); 
}

// --------
// POST
// --------

const addPlainTech = async (req, res) => {
    let { name, introduced, age, effects } = req.body;

    const array = await Tech.find();
    const id = array.length + 30001;
    
    const tech = new Tech({
        id,
        name,
        introduced,
        age,
        image: "default.png",
        effects,
        research: {
            at: 0,
            resources: 0
        },
        time_in_seconds: 0
    });

    try {
        await tech.save();
        res.json(tech);
    } catch(e) {
        console.log(e);
        res.json(tech);
    }
}

const addSimpleTech = async (req, res) => {
    let { name, introduced, age, image, effects, at, food, wood, stone, gold, time_in_seconds } = req.body;

    const array = await Tech.find();
    const id = array.length + 30001;
    image = image.concat(".png");
    
    const tech = new Tech({
        id,
        name,
        introduced,
        age,
        image,
        effects,
        research: {
            at,
            resources: {
                food,
                wood,
                stone,
                gold
            }
        },
        time_in_seconds
    });

    try {
        await tech.save();
        res.json(tech);
    } catch(e) {
        console.log(e);
        res.json(e);
    }
}

// --------
// PUT
// --------

const updateNameOfTech = async (req, res) => {
    let { nombre } = req.params;
    const cambio = req.body;

    nombre = replaceChar("-", " ", nombre);
    const tech = await Tech.updateOne({ name: nombre }, cambio);

    sendResponse(res, tech); 
}

const updateResearchOfTech = async (req, res) => {
    let { nombre } = req.params;
    const { food, wood, stone, gold} = req.body;

    nombre = replaceChar("-", " ", nombre);
    const tech = await Tech.updateOne({ name: nombre }, { 
        research: {
            resources: {
                food, 
                wood,
                stone,
                gold
            }
        }
     });

    sendResponse(res, tech);
}

const clearTech = async (req, res) => {
    let { nombre } = req.params;

    nombre = replaceChar("-", " ", nombre);
    const tech = await Tech.updateOne({ name: nombre }, { 
        introduced: null,
        age: null,
        image: "default.png",
        effects: null,
        research: {
            at: null,
            prerequisite: null,
            requisite_for: null,
            resources: {
                food: null,
                wood: null,
                stone: null,
                gold: null
            }
        },
        time_in_seconds: null
     });

    sendResponse(res, tech);
}

// --------
// DELETE
// --------

const deleteTech = async (req, res) => {
    let { name } = req.params;

    nombre = replaceChar("-", " ", name);
    const tech = await Tech.deleteOne({ name });
    
    sendResponse(res, tech);
}

const deleteAllTechByAge = async (req, res) => {
    let { age } = req.params;

    nombre = replaceChar("-", " ", nombre);
    const tech = await Tech.deleteMany({ age });
    
    sendResponse(res, tech);
}

const deleteAllTechByBuilding = async (req, res) => {
    let { at } = req.params;

    nombre = replaceChar("-", " ", nombre);
    const tech = await Tech.deleteMany({ at });
    
    sendResponse(res, tech);
}

module.exports = {
    getAllTech,
    getTechByName,
    getTechByRelease,
    getTechByAge,
    getTechByResource,
    getTechByBuilding,

    addPlainTech,
    addSimpleTech,

    updateNameOfTech,
    updateResearchOfTech,
    clearTech,

    deleteTech,
    deleteAllTechByAge,
    deleteAllTechByBuilding
}