var express = require('express');
var router = express.Router();

/* GET users page. */
let company = require('../controllers/company');
router.get('/', company.index);

module.exports = router;
