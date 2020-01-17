const express = require('express');
const router = express.Router();
const VerifyDomain = require('../middleware/verifyDomain');

/* GET home page. */
let index = require('../controllers/index');
router.get('/', [VerifyDomain], index.index);

module.exports = router;
