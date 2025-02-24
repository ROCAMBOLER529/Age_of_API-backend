/*
+-----------------------+
|                       |
| controllers/nature.js |
|                       |
+-----------------------+
*/

const Nature = require("../models/nature");
const { replaceChar, sendResponse, setIdForElement } = require("../helpers/functions");

// --------
// GET
// --------

const getAllNatures = async (req, res) => {
    const nature = await Nature.find().exec();
    
    sendResponse(res, nature.map(x => x.name));
}

const getNatureByName = async (req, res) => {
    let { name } = req.params;

    const nature = await Nature.find({ name: replaceChar("-", " ", name) }).exec();

    sendResponse(res, nature);
}

const getNatureByRelease = async (req, res) => {
    let { introduced } = req.params;

    const nature = await Nature.find({ introduced: replaceChar("-", " ", introduced) }).exec();

    sendResponse(res, nature.map(x => x.name));
}

const getNatureByResurce = async (req, res) => {
    let { resource } = req.params;

    const nature = await Nature.find().exec();
    const filteredNature = nature.filter(x => x.resources.hasOwnProperty(resource) && !x.resources[resource]);

    sendResponse(res, filteredNature.map(x => x.name));
}

// --------
// POST
// --------

const addNature = async (req, res) => {
    let { name, introduced, hp, food, wood, stone, gold} = req.body;

    const natures = await Nature.find().exec();
    const id = setIdForElement(natures, 50001);

    const nature = new Nature({
        id: parseInt(id),
        name,
        introduced,
        hp: parseInt(hp),
        resources: {
            food: parseInt(food),
            wood: parseInt(wood),
            stone: parseInt(stone),
            gold: parseInt(gold)
        }
    });

    try {
        await nature.save();
        res.json(nature);
    } catch (e) {
        console.log(e);
        res.json(e);
        
    }
}

// --------
// PUT
// --------

const updateInfoOfNature = async (req, res) => {
    let { nombre } = req.params;
    let cambio = req.body;

    const nature = await Nature.findOneAndUpdate({ name: nombre}, cambio).exec();

    sendResponse(res, nature);
}

const updateResourceOfNature = async (req, res) => {
    let { nombre } = req.params;
    let cambio = req.body;

    const nature = await Nature.findOneAndUpdate({ name: nombre }, { resources: cambio }).exec();

    sendResponse(res, nature);
}

// --------
// DELETE
// --------

const deleteNature = async (req, res) => {
    let { name } = req.params;
    
    const nature = await Nature.findOneAndDelete({ name }).exec();

    sendResponse(res, nature);
}

module.exports = {
    getAllNatures,
    getNatureByName,
    getNatureByRelease,
    getNatureByResurce,

    addNature,

    updateInfoOfNature,
    updateResourceOfNature,

    deleteNature
}