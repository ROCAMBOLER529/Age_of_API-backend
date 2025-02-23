/*
+----------------+
|                |
| routes/auth.js |
|                |
+----------------+
*/

const express = require('express');
const router = express.Router();
const { logIn } = require('../controllers/auth');

router.post('/', logIn);

module.exports = router;