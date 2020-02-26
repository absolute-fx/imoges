const express = require('express');
const router = express.Router();
const verifyConnection = require('../middleware/verifyConnection');
const verifyDomain = require('../middleware/verifyDomain');

/* GET account page. */
let account = require('../controllers/account');
router.get('/', [verifyDomain, verifyConnection], account.index);
router.get('/user', [verifyDomain, verifyConnection], account.userData);
router.post('/userupdate', [verifyDomain, verifyConnection], account.updateUser);
router.get('/realties', [verifyDomain, verifyConnection], account.realtiesList);
router.get('/sav', [verifyDomain, verifyConnection], account.afterSale);
router.get('/ticket', [verifyDomain, verifyConnection], account.getTicket);
router.get('/tickets', [verifyDomain, verifyConnection], account.getAllTickets);

module.exports = router;
