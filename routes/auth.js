const express = require('express');
const router = express.Router();

/* GET auth  */
let auth = require('../controllers/auth');
router.post('/', auth.index);

module.exports = router;
