/*
+------------------------+
|                        |
| controllers/animals.js |
|                        |
+------------------------+
*/

const Animal = require('../models/animals');
const { replaceChar, sendResponse } = require('../helpers/functions');

// --------
// GET
// --------

const getAllAnimals = async (req, res) => {
    const animals = await Animal.find().exec();
    console.log(animals);
    

    sendResponse(res, animals.map(x => x.name));
}

const getAnimalByName = async (req, res) => {
    let { name } = req.params;

    const animals = await Animal.findOne({ name }).exec();

    sendResponse(res, animals);
}

const getAnimalsByIntroduced = async (req, res) => {
    let { introduced } = req.params;

    introduced = replaceChar("-", " ", introduced);
    const animals = await Animal.find({ introduced }).exec();

    sendResponse(res, animals.map(x => x.name));
}

const getAttackingAnimals = async (req, res) => {
    let { canAttack } = req.params;

    const animals = await Animal.find({ canAttack: true }).exec();

    sendResponse(res, animals.map(x => x.name));
}

const getAnimalsByFoodDropped = async (req, res) => {
    let { amount } = req.params;

    const animals = await Animal.find().exec();
    const filteredAnimals = animals.filter(x => x.statistics.resources.food == amount);

    sendResponse(res, filteredAnimals.map(x => x.name));
}

// --------
// POST
// --------

const addPlainAminal = async (req, res) => {
    let { name, introduced, canAttack } = req.body;

    const array = await Animal.find();
    const id = array.length + 40001;
    
    const animal = new Animal({
        id,
        name,
        introduced,
        image: "default.png",
        canAttack,        
    });

    try {
        await animal.save();
        res.json(animal);
    } catch(e) {
        console.log(e);
        res.json(animal);
    }
}

const addAnimal = async (req, res) => {
    let { name, introduced, canAttack , hp, meleeArmor, pierceArmor, speed, los, food } = req.body;

    const array = await Animal.find();
    const id = array.length + 40001;

    const animal = new Animal({
        id: parseInt(id),
        name,
        introduced,
        image: "default.png",
        canAttack,
        statistics: {
            hp: parseInt(hp),
            meleeArmor: parseInt(meleeArmor),
            pierceArmor: parseInt(pierceArmor),
            speed: parseFloat(speed),
            los: parseInt(los),
            resources: {
                food: parseInt(food)
            }
        }
    });

    try {
        await animal.save();
        res.json(animal);
    } catch (e) {
        console.log(e);
        res.json(animal);
    }
}

// --------
// PUT
// --------

const updateAnimal = async (req, res) => {
    let { nombreOriginal } = req.params;
    let { name, introduced, canAttack , hp, meleeArmor, pierceArmor, speed, los, food } = req.body;

    const animal = await Animal.updateOne({ name: replaceChar("-", " ", nombreOriginal)}, {
        name,
        introduced,
        canAttack,
        statistics: {
            hp: parseInt(hp),
            meleeArmor: parseInt(meleeArmor),
            pierceArmor: parseInt(pierceArmor),
            speed: parseFloat(speed),
            los: parseInt(los),
            resources: {
                food: parseInt(food)
            }
        }
    });

    sendResponse(res, animal);
}

const updateNameOfAnimal = async (req, res) => {
    let { nombreOriginal } = req.params;
    let cambio = req.body;

    const animal = await Animal.updateOne({ name: replaceChar("-", " ", nombreOriginal)}, cambio);
}

// --------
// DELETE
// --------

const deleteAnimal = async (req, res) => {
    let { name } = req.params;

    const animal = await Animal.deleteOne({ name }).exec();

    sendResponse(res, animal);
}

module.exports = {
    getAllAnimals,
    getAnimalByName,
    getAnimalsByIntroduced,
    getAttackingAnimals,
    getAnimalsByFoodDropped,
    
    addPlainAminal,
    addAnimal,

    updateAnimal,
    updateNameOfAnimal,

    deleteAnimal
}