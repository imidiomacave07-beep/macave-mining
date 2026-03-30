const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans.controller');

router.get('/', plansController.getPlans);
router.post('/buy', plansController.buyPlan);
router.get('/balance/:userId', plansController.getUserBalance);

module.exports = router;
