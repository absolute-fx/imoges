var express = require('express');
var router = express.Router();

/* GET users page. */
let users = require('../controllers/users');
router.get('/', users.index);

module.exports = router;
