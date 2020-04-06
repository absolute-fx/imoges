const express = require('express');
const router = express.Router();

/* GET project page. */
let project = require('../controllers/supportcategories');
router.get('/:catId', project.getOne);

module.exports = router;
