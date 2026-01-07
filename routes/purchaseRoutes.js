const express = require("express");
const router = express.Router();

// Simulação de base de dados em memória
let users = [
  { _id: "user1", username: "teste", balance: 0, plans: [] }
];

const planos = [
  { _id: "bronze", name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
  { _id: "prata", name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
  { _id: "ouro", name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
];

// Compra de plano
router.post("/", (req, res) => {
  const { userId, planId } = req.body;
  const user = users.find(u => u._id === userId);
  const plan = planos.find(p => p._id === planId);

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  if (!plan) return res.status(404).json({ message: "Plano não encontrado" });

  // Simula débito e adiciona plano
  user.balance -= plan.price;
  user.plans.push({ ...plan, startDate: new Date() });

  res.json({ message: `Plano ${plan.name} comprado com sucesso!`, balance: user.balance });
});

module.exports = router;
