const express = require('express');
const router = express.Router();

/* GET realties page. */
let realties = require('../controllers/realties');
router.get('/', realties.index);

module.exports = router;
