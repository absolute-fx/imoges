const express = require('express');
const router = express.Router();
const verifyConnection = require('../middleware/verifyConnection');

/* GET account page. */
let account = require('../controllers/account');
router.get('/', verifyConnection, account.index);

module.exports = router;
