const express = require('express');
const router = express.Router();
const verifyDomain = require('../middleware/verifyDomain');
const verifyConnection = require('../middleware/verifyDomain');

/* GET home page. */
let index = require('../controllers/index');
router.get('/', [verifyDomain], index.index);

module.exports = router;
