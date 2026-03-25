const express = require('express');
const router = express.Router();

// Planos de mineração
const plans = [
  { name: 'Starter', price: 5, minProfit: 0.5, maxProfit: 1 },
  { name: 'Basic', price: 20, minProfit: 1, maxProfit: 2 },
  { name: 'Pro', price: 50, minProfit: 2, maxProfit: 3 },
  { name: 'Advanced', price: 100, minProfit: 3, maxProfit: 5 }
];

router.get('/', (req, res) => {
  res.json(plans);
});

module.exports = router;
