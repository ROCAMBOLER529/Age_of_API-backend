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

router.get('/all/', getUsuarios);
router.get('/byName/:name', getUsuariosByName);
router.get('/byRol/:rol', getUsuariosByRol);
router.get('/banned/', getUsuariosByBan);

router.post('/addUsuario/', validarJWT, addUsuario);

router.put('/updateUsuario/:nombre', validarJWT, updateUsuario);
router.put('/banUsuario/:name', validarJWT, banUsuario);
router.put('/unbanUsuario/:name', validarJWT, unbanUsuario);
router.put('/promoteUsuario/:name', validarJWT, promoteUsuario);
router.put('/demoteUsuario/:name', validarJWT, demoteUsuario);

router.delete('/deleteUsuario/:name', validarJWT, deleteUsuario);

module.exports = router;
