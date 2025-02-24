/*
+-----------------+
|                 |
| routes/units.js |
|                 |
+-----------------+
*/

const express = require('express');
const router = express.Router();

const {
    getUnits,
    getUnitByName,
    getUnitByRelease,
    getUnitByAge,
    getUnitsByResource,

    addUnit,

    updateStatsOfUnit,
    updateInfoOfUnit,

    deleteUnit
} = require('../controllers/units');
const {
    validarJWT
} = require('../middlewares/auth');

router.get('/all/', getUnits);
router.get('/byName/:name', getUnitByName);
router.get('/byRelease/:introduced', getUnitByRelease)
router.get('/byAge/:age', getUnitByAge);
router.get('/byResource/:resource', getUnitsByResource);

router.post('/addUnit/', validarJWT, addUnit);

router.put('/updateStatsOfUnit/:nombre', validarJWT, updateStatsOfUnit);
router.put('/updateInfoOfUnit/:nombre', validarJWT, updateInfoOfUnit);

router.delete('/deleteUnit/:name', validarJWT, deleteUnit);

module.exports = router;