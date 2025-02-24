/*
+---------------------+
|                     |
| routes/buildings.js |
|                     |
+---------------------+
*/

const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/buildings');
const {
    validarJWT
} = require('../middlewares/auth');

router.get('/all', getAllBuildings);
router.get('/byName/:name', getBuildingByName);
router.get('/byIntroduced/:introduced', getBuildingsByIntroduced);
router.get('/byType/:type', getBuildingsByType);
router.get('/byAge/:age', getBuildingsByAge);
router.get('/byResource/:resource', getBuildingsByResource);

router.post('/addPlainBuilding/', validarJWT, addPlainBuilding);
router.post('/addSimpleBuilding/', validarJWT, addSimpleBuilding);

router.put('/updateNameOfBuilding/:nombre', validarJWT, updateNameOfBuilding);
router.put('/updateStatsOfBuilding/:nombre', validarJWT, updateStatsOfBuilding);
router.put('/clearBuilding/:nombre', validarJWT, clearBuilding);

router.delete('/deleteBuilding/:name', validarJWT, deleteBuilding);
router.delete('/deleteAllBuildingByAge/:age', validarJWT, deleteAllBuildingByAge);

module.exports = router;

