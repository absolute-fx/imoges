var express = require('express');
var router = express.Router();

/* GET project page. */
let project = require('../controllers/project');
router.get('/', project.index);

module.exports = router;
