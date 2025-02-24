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
    const {
        validarJWT
    } = require('../middlewares/auth');

router.get('/all/', validarJWT, getUsuarios);
router.get('/byName/:name', validarJWT, getUsuariosByName);
router.get('/byRol/:rol', validarJWT, getUsuariosByRol);
router.get('/banned/', validarJWT, getUsuariosByBan);

router.post('/addUsuario/', validarJWT, addUsuario);

router.put('/updateUsuario/:nombre', updateUsuario);
router.put('/banUsuario/:name', banUsuario);
router.put('/unbanUsuario/:name', unbanUsuario);
router.put('/promoteUsuario/:name', promoteUsuario);
router.put('/demoteUsuario/:name', demoteUsuario);

router.delete('/deleteUsuario/:name', deleteUsuario);

module.exports = router;