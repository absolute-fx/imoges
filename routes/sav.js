const express = require('express');
const router = express.Router();

/* GET sav page. */
let sav = require('../controllers/sav');
router.get('/', sav.index);

module.exports = router;
