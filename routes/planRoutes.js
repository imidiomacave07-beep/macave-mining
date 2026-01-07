const express = require("express");
const router = express.Router();

// Planos hardcoded
const planos = [
  { _id: "bronze", name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
  { _id: "prata", name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
  { _id: "ouro", name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
];

// Retorna os planos
router.get("/", (req, res) => {
  res.json(planos);
});

module.exports = router;
