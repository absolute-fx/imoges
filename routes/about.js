var express = require('express');
var router = express.Router();

/* GET about page. */
let about = require('../controllers/about');
router.get('/', about.index);

module.exports = router;
