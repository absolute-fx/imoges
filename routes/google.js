const express = require('express');
const router = express.Router();

/* GET history page. */
let google = require('../controllers/google');
router.get('/', google.index);

module.exports = router;