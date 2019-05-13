const express = require('express');
const router = express.Router();

/* GET history page. */
let history = require('../controllers/history');
router.get('/', history.index);

module.exports = router;