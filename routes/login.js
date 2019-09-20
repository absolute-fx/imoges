const express = require('express');
const router = express.Router();

/* GET login page. */
let login = require('../controllers/login');
router.get('/', login.index);

module.exports = router;