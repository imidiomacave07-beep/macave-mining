const express = require('express');
const router = express.Router();

const plans = [
  { name: 'Starter', price: 5, min: 0.5, max: 1 },
  { name: 'Basic', price: 20, min: 1, max: 2 },
  { name: 'Pro', price: 50, min: 2, max: 3 }
];

router.get('/', (req, res) => {
  res.json(plans);
});

module.exports = router;
