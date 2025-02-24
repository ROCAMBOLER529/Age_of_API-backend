/*
+------------------------------+
|                              |
| controllers/civilizations.js |
|                              |
+------------------------------+
*/

const Civ = require("../models/civilizations");
const { replaceChar, sendResponse, setIdForElement } = require('../helpers/functions');
const {
    getUnit,

    getUnitsFromId,
    getBuildingFromId,
    getTechFromId
} = require('../helpers/getter');

// --------
// GET
// --------

const getAllCivs = async (req, res) => {
    const civ = await Civ.find().exec();

    sendResponse(res, civ.map(x => x.name));
}

const getCivByName = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.findOne({ "name.common": name }).exec();

    sendResponse(res, civ);
}

const getInfoOfCiv = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.findOne({ "name.common": name }).exec();

    sendResponse(res, civ.information);
}

const getBonusOfCiv = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.findOne({ "name.common": name }).exec();

    sendResponse(res, civ.bonuses);
}

const getUnitsOfCiv = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.findOne({ "name.common": name }).exec();    

    sendResponse(res, await getUnitsFromId(civ.units));
}

const getBuildingsOfCiv = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.findOne({ "name.common": name }).exec();    

    sendResponse(res, await getBuildingFromId(civ.buildings));
}

const getTechOfCiv = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.findOne({ "name.common": name }).exec();    

    sendResponse(res, await getTechFromId(civ.tech));
}

const getCivsByRelease = async (req, res) => {
    let { introduced } = req.params;

    const civ = await Civ.find({ "information.introduced": replaceChar("-", " ", introduced) }).exec();

    sendResponse(res, civ.map(x => x.name.common));
}

const getCivsByArchitecture = async (req, res) => {
    let { architecture } = req.params;

    const civ = await Civ.find({ "information.architecture": replaceChar("-", " ", architecture) }).exec();

    sendResponse(res, civ.map(x => x.name.common));
}

// --------
// POST
// --------

const addPlainCiv = async (req, res) => {
    let { common, historical, introduced, architecture, continent, image, features, single_bonus, team_bonus } = req.body;
    const name = {
        common,
        historical
    }
    const information = {
        introduced,
        architecture,
        continent,
        image
    }
    const bonuses = {
        features,
        single_bonus,
        team_bonus
    }

    const civs = await Civ.find().exec();
    const id = setIdForElement(civs, 1000);

    const civ = new Civ({
        id: parseInt(id),
        name,
        information,
        bonuses
    });

    try {
        await civ.save();
        res.json(civ);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
}

// --------
// PUT
// --------

const updateCivilization = async (req, res) => {
    let { nombre } = req.params;
    let { common, historical, introduced, architecture, continent, image, features, single_bonus, team_bonus } = req.body;
    const name = {
        common,
        historical
    }
    const information = {
        introduced,
        architecture,
        continent,
        image
    }
    const bonuses = {
        features,
        single_bonus,
        team_bonus
    }

    const civ = await Civ.updateOne({ "name.common": nombre }, {
        name,
        information,
        bonuses
    }).exec();

    sendResponse(res, civ);
}

const updateAIPlayerNames = async (req, res) => {
    let { nombre } = req.params;
    let { ai_players_names } = req.body;

    const civ = await Civ.findOneAndUpdate({ "name.common": nombre }, { $set: { ai_players_names }}, { new: true }).exec();
    console.log(civ);    

    sendResponse(res, civ);
}

const addUnitsToCiv = async (req, res) => {
    let { nombre } = req.params;
    let { units } = req.body;

    const unitsConId = units.map(x => getUnit(x));
    console.log(unitsConId);
    

    const civ = await Civ.findOneAndUpdate({ "name.common": nombre }, { $set: { units: unitsConId }}, { new: true }).exec();

    sendResponse(res, civ);

}

// --------
// DELETE
// --------

const deleteCiv = async (req, res) => {
    let { name } = req.params;

    const civ = await Civ.deleteOne({ "name.common": name }).exec();

    sendResponse(res, civ);
}


module.exports = {
    getAllCivs,
    getCivByName,
    getInfoOfCiv,
    getBonusOfCiv,
    getUnitsOfCiv,
    getBuildingsOfCiv,
    getTechOfCiv,
    getCivsByRelease,
    getCivsByArchitecture,

    addPlainCiv,

    updateCivilization,
    updateAIPlayerNames,
    addUnitsToCiv,

    deleteCiv
}