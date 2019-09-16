const express = require('express');
const router = express.Router();

/* GET invest page. */
let invest = require('../controllers/invest');
router.get('/', invest.index);

module.exports = router;