/*

+-------------------+
|                   |
| routes/usuario.js |
|                   |
+-------------------+

*/

const express = require('express');
const router = express.Router();

const { getUsuarios, 
        getUsuariosByName,
        getUsuariosByRol, 
        getUsuariosByBan,

        addUsuario,

        updateUsuario,
        banUsuario,
        unbanUsuario,
        promoteUsuario,

        deleteUsuario,
        demoteUsuario
    } = require('../controllers/usuario');

router.get('/all/', getUsuarios);
router.get('/byName/:name', getUsuariosByName);
router.get('/byRol/:rol', getUsuariosByRol);
router.get('/banned/', getUsuariosByBan);

router.post('/addUsuario/', addUsuario);

router.put('/updateUsuario/:nombre', updateUsuario);
router.put('/banUsuario/:name', banUsuario);
router.put('/unbanUsuario/:name', unbanUsuario);
router.put('/promoteUsuario/:name', promoteUsuario);
router.put('/demoteUsuario/:name', demoteUsuario);

router.delete('/deleteUsuario/:name', deleteUsuario);

module.exports = router;