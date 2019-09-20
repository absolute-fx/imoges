var express = require('express');
var router = express.Router();

/* GET contact page. */
let faq = require('../controllers/faq');
router.get('/', faq.index);

module.exports = router;
