const express = require('express');
const router = express.Router();
const verifyDomain = require('../middleware/verifyDomain');

let tickets = require('../controllers/tickets');
router.post('/', verifyDomain, tickets.setTicket);
router.post('/message', verifyDomain, tickets.setMessage);
router.get('/close', verifyDomain,  tickets.closeTicket);
router.get('/plan', verifyDomain, tickets.planWo);
router.get('/done', verifyDomain, tickets.setWoDone);

module.exports = router;
