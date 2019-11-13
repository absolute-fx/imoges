const express = require('express');
const router = express.Router();

/* GET account page. */
let account = require('../controllers/account');
router.get('/', account.index);

module.exports = router;
