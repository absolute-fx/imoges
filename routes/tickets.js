const express = require('express');
const router = express.Router();

let tickets = require('../controllers/tickets');
router.post('/', tickets.setTicket);

module.exports = router;
