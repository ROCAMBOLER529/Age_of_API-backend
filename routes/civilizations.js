/*
+-------------------------+
|                         |
| routes/civilizations.js |
|                         |
+-------------------------+
*/

const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/civilizations');
const {
    validarJWT
} = require('../middlewares/auth');

router.get('/all/', getAllCivs);
router.get('/byName/:name', getCivByName);
router.get('/getInfoOfCiv/:name', getInfoOfCiv);
router.get('/getBonusOfCiv/:name', getBonusOfCiv);
router.get('/getUnitsOfCiv/:name', getUnitsOfCiv);
router.get('/getBuildingsOfCiv/:name', getBuildingsOfCiv);
router.get('/getTechOfCiv/:name', getTechOfCiv);
router.get('/byRelease/:introduced', getCivsByRelease);
router.get('/byArchitecture/:architecture', getCivsByArchitecture);

router.post('/addPlainCiv/', validarJWT, addPlainCiv);

router.put('/updateCiv/:nombre', validarJWT, updateCivilization);
router.put('/updateAIPlayerNames/:nombre', validarJWT, updateAIPlayerNames);
router.put('/addUnitsToCiv/:nombre', validarJWT, addUnitsToCiv);

router.delete('/deleteCiv/:name', validarJWT, deleteCiv);

module.exports = router;