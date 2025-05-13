/*
+----------------+
|                |
| routes/tech.js |
|                |
+----------------+
*/

const express = require('express');
const router = express.Router();
const {
    getAllTech,
    getTechByName,
    getTechByRelease,
    getTechByAge,
    getTechByResource,
    getTechByBuilding,

    addPlainTech,
    addSimpleTech,

    updateNameOfTech,
    updateResearchOfTech,
    clearTech,

    deleteTech,
    deleteAllTechByAge,
    deleteAllTechByBuilding
} = require('../controllers/tech');
const {
    validarJWT
} = require('../middlewares/auth');

router.get('/all', getAllTech);
router.get('/byName/:name', getTechByName);
router.get('/byRelease/:introduced', getTechByRelease);
router.get('/byAge/:age', getTechByAge);
router.get('/byResource/:resource', getTechByResource);
router.get('/byBuilding/:building', getTechByBuilding);

router.post('/addPlainTech/', addPlainTech);
router.post('/addSimpleTech/', addSimpleTech);

router.put('/updateNameOfTech/:nombre', updateNameOfTech);
router.put('/updateResearchOfTech/:nombre', updateResearchOfTech);
router.put('/clearTech/:nombre', clearTech);

router.delete('/deleteTech/:name', deleteTech);
router.delete('/deleteAllTechByAge/:age', deleteAllTechByAge);
router.delete('/deleteAllTechByBuilding/:at', deleteAllTechByBuilding);

module.exports = router;
