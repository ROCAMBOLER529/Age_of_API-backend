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

router.post('/addPlainCiv/', addPlainCiv);

router.put('/updateCiv/:nombre', updateCivilization);
router.put('/updateAIPlayerNames/:nombre', updateAIPlayerNames);
router.put('/addUnitsToCiv/:nombre', addUnitsToCiv);

router.delete('/deleteCiv/:name', deleteCiv);

module.exports = router;
