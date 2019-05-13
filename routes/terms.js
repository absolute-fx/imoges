const express = require('express');
const router = express.Router();

/* GET terms page. */
let terms = require('../controllers/terms');
router.get('/', terms.index);

module.exports = router;