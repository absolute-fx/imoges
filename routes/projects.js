const express = require('express');
const router = express.Router();

/* GET projects page. */
let projects = require('../controllers/projects');
router.get('/', projects.index);

module.exports = router;
