const express = require("express");
const fs = require("fs");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Listar planos
router.get("/", (req, res) => {
  const plans = JSON.parse(fs.readFileSync("./public/plans.json"));
  res.json(plans);
});

// Comprar plano
router.post("/buy", authMiddleware, async (req, res) => {
  const { planName, planPrice } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  if (user.balance < planPrice) return res.status(400).json({ error: "Saldo insuficiente" });
  user.balance -= planPrice;
  await user.save();
  res.json({ message: `Plano ${planName} comprado com sucesso!`, balance: user.balance });
});

module.exports = router;
