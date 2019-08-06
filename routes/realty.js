const express = require('express');
const router = express.Router();

/* GET realty page. */
let realty = require('../controllers/realty');
router.get('/', realty.index);

module.exports = router;
