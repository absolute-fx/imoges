const express = require('express');
const router = express.Router();

/* GET users page. */
let qualitychart = require('../controllers/qualitychart');
router.get('/', qualitychart.index);

module.exports = router;
