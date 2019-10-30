const express = require('express');
const router = express.Router();

/* POST contactform controller. */
let contactform = require('../controllers/contactform');
router.post('/', contactform.index);

module.exports = router;