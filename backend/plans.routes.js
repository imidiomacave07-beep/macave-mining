const express = require('express');
const router = express.Router();

const plans = [
  { name: 'Starter', price: 20, profit: '1-2%' },
  { name: 'Basic', price: 50, profit: '3-4%' },
  { name: 'Pro', price: 100, profit: '5-6%' },
  { name: 'Advanced', price: 200, profit: '7-8%' }
];

router.get('/', (req, res) => {
  res.json(plans);
});

module.exports = router;
