/*
+-------------------+
|                   |
| helpers/getter.js |
|                   |
+-------------------+
*/

const Unit = require('../models/units');
const Building = require('../models/buildings');
const Tech = require('../models/tech');

const getBuilding = async nameOfBuilding => {
    const building = await Building.findOne({ name: nameOfBuilding }).exec();
    
    return building.id;
}

const getUnit = async nameOfUnit => {
    const unit = await Unit.findOne({ name: nameOfUnit }).exec();

    return unit.id;
}

const getUnitsFromId = async unitsOfCiv => {
    const allUnits = await Unit.find().exec();

    const listOfUnits = Object.values(unitsOfCiv).map(x => x.map(y => allUnits.find(element => element.id == y).name));   
    return listOfUnits;
}

const getBuildingFromId = async buildingsOfCiv => {
    const allBuildings = await Building.find().exec();

    const listOfBuildings = Object.values(buildingsOfCiv).map(x => x.map(y => allBuildings.find(element => element.id == y).name));
    return listOfBuildings;
}

const getTechFromId = async techOfCiv => {
    const allTech = await Tech.find().exec();

    const listOfTech = Object.values(techOfCiv).map(x => x.map(y => allTech.find(element => element.id == y).name));
    return listOfTech;
}

module.exports = {
    getBuilding,
    getUnit,

    getUnitsFromId,
    getBuildingFromId,
    getTechFromId
}