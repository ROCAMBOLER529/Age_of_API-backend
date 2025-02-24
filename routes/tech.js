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

router.post('/addPlainTech/', validarJWT, addPlainTech);
router.post('/addSimpleTech/', validarJWT, addSimpleTech);

router.put('/updateNameOfTech/:nombre', validarJWT, updateNameOfTech);
router.put('/updateResearchOfTech/:nombre', validarJWT, updateResearchOfTech);
router.put('/clearTech/:nombre', validarJWT, clearTech);

router.delete('/deleteTech/:name', validarJWT, deleteTech);
router.delete('/deleteAllTechByAge/:age', validarJWT, deleteAllTechByAge);
router.delete('/deleteAllTechByBuilding/:at', validarJWT, deleteAllTechByBuilding);

module.exports = router;