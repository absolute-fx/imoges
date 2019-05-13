const express = require('express');
const router = express.Router();

/* GET home page. */
let index = require('../controllers/index');
router.get('/', index.index);

module.exports = router;
