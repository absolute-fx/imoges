const express = require('express');
const router = express.Router();

/* GET newsletter controller. */
let newsletter = require('../controllers/newsletter');
router.get('/', newsletter.index);

module.exports = router;