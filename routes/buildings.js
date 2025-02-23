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

router.get('/all', getAllBuildings);
router.get('/byName/:name', getBuildingByName);
router.get('/byIntroduced/:introduced', getBuildingsByIntroduced);
router.get('/byType/:type', getBuildingsByType);
router.get('/byAge/:age', getBuildingsByAge);
router.get('/byResource/:resource', getBuildingsByResource);

router.post('/addPlainBuilding/', addPlainBuilding);
router.post('/addSimpleBuilding/', addSimpleBuilding);

router.put('/updateNameOfBuilding/:nombre', updateNameOfBuilding);
router.put('/updateStatsOfBuilding/:nombre', updateStatsOfBuilding);
router.put('/clearBuilding/:nombre', clearBuilding);

router.delete('/deleteBuilding/:name', deleteBuilding);
router.delete('/deleteAllBuildingByAge/:age', deleteAllBuildingByAge);

module.exports = router;

