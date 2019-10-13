const express = require('express');
const router = express.Router();

/* GET video gallery page. */
let photogal = require('../controllers/photogal');
router.get('/', photogal.index);

module.exports = router;
