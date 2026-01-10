const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.models.User || mongoose.model("User");

router.post("/request", async (req, res) => {
  const { userId, amount, method, destination } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: "Usuário inválido" });

  if (amount > user.balance)
    return res.status(400).json({ error: "Saldo insuficiente" });

  user.balance -= amount;
  user.withdraws.push({
    amount,
    method,
    destination,
    date: new Date()
  });

  await user.save();
  res.json({ message: "Saque solicitado", balance: user.balance });
});

module.exports = router;
