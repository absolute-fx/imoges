const express = require('express');
const router = express.Router();

/* GET history page. */
let cg = require('../controllers/cg');
router.get('/', cg.index);

module.exports = router;