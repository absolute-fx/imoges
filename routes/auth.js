var express = require('express');
var router = express.Router();

/* GET auth  */
let auth = require('../controllers/auth');
router.get('/', auth.index);

module.exports = router;
