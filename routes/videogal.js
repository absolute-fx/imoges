const express = require('express');
const router = express.Router();

/* GET video gallery page. */
let videogal = require('../controllers/videogal');
router.get('/', videogal.index);

module.exports = router;
