const express = require('express');
const router = express.Router();

/* GET auth  */
let auth = require('../controllers/auth');
router.post('/signin', auth.signin);
router.post('/signup', auth.signup);
router.get('/validate', auth.validate);
router.get('/validationmail', auth.validationMail);
router.get('/forgottenpass', auth.forgottenPass);
router.post('/resetpass', auth.resetPass);
router.get('/newpass', auth.newPass);
router.post('/savepass', auth.savePass);
router.get('/notvalidated', auth.notValidated);

module.exports = router;
