var express = require('express');
var router = express.Router();

/* GET contact page. */
let faq = require('../controllers/faq');
router.post('/', faq.index);

module.exports = router;
