const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");
const User = require("../models/User");

// LISTAR TODOS
router.get("/deposits", async (req, res) => {
  const data = await Deposit.find().populate("userId");
  res.json(data);
});

// CONFIRMAR DEPÓSITO
router.post("/deposit/confirm", async (req, res) => {
  const { id } = req.body;

  const deposit = await Deposit.findById(id);
  if (!deposit) return res.status(404).json({ error: "Não encontrado" });

  deposit.status = "confirmed";
  await deposit.save();

  // adicionar saldo ao usuário
  const user = await User.findById(deposit.userId);
  user.balanceUSDT += deposit.amount;
  await user.save();

  res.json({ success: true });
});

module.exports = router;
