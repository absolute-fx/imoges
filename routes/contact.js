var express = require('express');
var router = express.Router();

/* GET contact page. */
let contact = require('../controllers/contact');
router.get('/', contact.index);

module.exports = router;
