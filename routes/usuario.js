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
        validarJWT,
        esAdmin
    } = require('../middlewares/auth');

router.get('/all/', esAdmin, getUsuarios);
router.get('/byName/:name', esAdmin, getUsuariosByName);
router.get('/byRol/:rol', esAdmin, getUsuariosByRol);
router.get('/banned/', esAdmin, getUsuariosByBan);

router.post('/addUsuario/', validarJWT, esAdmin, addUsuario);

router.put('/updateUsuario/:nombre', validarJWT, esAdmin, updateUsuario);
router.put('/banUsuario/:name', validarJWT, esAdmin, banUsuario);
router.put('/unbanUsuario/:name', validarJWT, esAdmin, unbanUsuario);
router.put('/promoteUsuario/:name', validarJWT, esAdmin, promoteUsuario);
router.put('/demoteUsuario/:name', validarJWT, esAdmin, demoteUsuario);

router.delete('/deleteUsuario/:name', validarJWT, esAdmin, deleteUsuario);

module.exports = router;
