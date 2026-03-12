const express = require("express");
const router = express.Router();

// Planos reais
const plans = [
  { name: "Starter", price: 20, dailyPercent: 1.2, days: 30 },
  { name: "Basic", price: 50, dailyPercent: 1.5, days: 30 },
  { name: "Pro", price: 100, dailyPercent: 1.7, days: 30 },
  { name: "Advanced", price: 200, dailyPercent: 2.0, days: 30 }
];

router.get("/", (req, res) => {
  res.json(plans);
});

module.exports = router;
