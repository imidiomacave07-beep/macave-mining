const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referral.controller');

router.post('/register', referralController.registerReferral);
router.get('/:userId', referralController.getReferrals);

module.exports = router;
