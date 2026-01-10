const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.models.User || mongoose.model("User");

const plans = [
  { id: 1, name: "Básico", price: 20, daily: 1.5, days: 30 },
  { id: 2, name: "Standard", price: 50, daily: 2, days: 30 },
  { id: 3, name: "Pro", price: 100, daily: 2.5, days: 40 },
  { id: 4, name: "Premium", price: 200, daily: 3, days: 45 }
];

// Listar planos
router.get("/", (req, res) => res.json(plans));

// Comprar plano
router.post("/buy", async (req, res) => {
  const { userId, planId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: "Usuário inválido" });

  const plan = plans.find(p => p.id === planId);
  if (!plan) return res.status(400).json({ error: "Plano inválido" });

  user.activePlans.push({
    ...plan,
    status: "pending",
    earned: 0,
    startDate: null
  });

  await user.save();
  res.json({ message: "Plano comprado (aguardando aprovação)" });
});

// Aprovar plano (admin)
router.post("/approve", async (req, res) => {
  const { userId, index } = req.body;
  const user = await User.findById(userId);
  if (!user || !user.activePlans[index])
    return res.status(400).json({ error: "Plano não encontrado" });

  user.activePlans[index].status = "active";
  user.activePlans[index].startDate = Date.now();
  await user.save();

  res.json({ message: "Plano aprovado" });
});

module.exports = router;
