const express = require('express');
const router = express.Router();

/* GET press page. */
let press = require('../controllers/press');
router.get('/', press.index);

module.exports = router;