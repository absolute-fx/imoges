const express = require('express');
const router = express.Router();
const verifyConnection = require('../middleware/verifyConnection');

/* GET account page. */
let account = require('../controllers/account');
router.get('/', verifyConnection, account.index);
router.get('/user', verifyConnection, account.userData);

module.exports = router;
