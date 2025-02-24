/*
+------------------+
|                  |
| routes/nature.js |
|                  |
+------------------+
*/

const express = require('express');
const router = express.Router();
const {
    getAllNatures,
    getNatureByName,
    getNatureByRelease,
    getNatureByResurce,

    addNature,

    updateInfoOfNature,
    updateResourceOfNature,

    deleteNature
} = require('../controllers/nature');
const {
    validarJWT
} = require('../middlewares/auth');

router.get('/all/', getAllNatures);
router.get('/byName/:name', getNatureByName);
router.get('/byIntroduced/:introduced', getNatureByRelease);
router.get('/byResource/:resource', getNatureByResurce);

router.post('/addNature/', validarJWT, addNature);

router.put('/updateInfoOfNature/:nombre', validarJWT, updateInfoOfNature);
router.put('/updateResourceOfNature/:nombre', validarJWT, updateResourceOfNature);

router.delete('/deleteNature/:name', validarJWT, deleteNature);

module.exports = router;