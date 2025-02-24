/*
+-------------------+
|                   |
| routes/animals.js |
|                   |
+-------------------+
*/

const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/animals');
const {
    validarJWT
} = require('../middlewares/auth');

router.get('/all/', getAllAnimals);
router.get('/getAnimalByName/:name', getAnimalByName);
router.get('/getAnimalsByIntroduced/:introduced', getAnimalsByIntroduced);
router.get('/getAttackingAnimals/', getAttackingAnimals);
router.get('/getAnimalsByFoodDropped/:amount', getAnimalsByFoodDropped);

router.post('/addPlainAminal/', validarJWT, addPlainAminal);
router.post('/addAnimal/', validarJWT, addAnimal);

router.put('/updateAnimal/:nombreOriginal', validarJWT, updateAnimal);
router.put('/updateNameOfAnimal/:nombreOriginal', validarJWT, updateNameOfAnimal);

router.delete('/deleteAnimal/:name', validarJWT, deleteAnimal);

module.exports = router;