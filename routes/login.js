const express = require('express');
const router = express.Router();
const verifyDomain = require('../middleware/verifyDomain');

/* GET login page. */
let login = require('../controllers/login');
router.get('/', verifyDomain, login.index);

module.exports = router;