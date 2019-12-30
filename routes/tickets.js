const express = require('express');
const router = express.Router();

let tickets = require('../controllers/tickets');
router.post('/', tickets.setTicket);
router.post('/message', tickets.setMessage);
router.get('/close', tickets.closeTicket);

module.exports = router;
