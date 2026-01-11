const express = require("express");
const router = express.Router();
const plans = require("./plans");

// simulação simples de banco (MVP)
let userPlans = {};
let userBalance = {};

router.post("/buy", (req, res) => {
  const { userId, planId } = req.body;

  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(400).json({ error: "Plano não encontrado" });
  }

  // saldo inicial padrão
  if (!userBalance[userId]) userBalance[userId] = 0;
  if (!userPlans[userId]) userPlans[userId] = [];

  if (userBalance[userId] < plan.price) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  userBalance[userId] -= plan.price;

  userPlans[userId].push({
    ...plan,
    startDate: new Date(),
    active: true
  });

  res.json({
    message: "Plano comprado com sucesso",
    balance: userBalance[userId],
    plans: userPlans[userId]
  });
});

module.exports = router;
