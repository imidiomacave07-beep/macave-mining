const express = require("express");
const router = express.Router();
const Withdrawal = require("../models/Withdrawal");
const User = require("../models/User");

// PEDIR SAQUE
router.post("/", async (req, res) => {
  try {
    const { userId, amount, wallet } = req.body;

    const user = await User.findById(userId);

    if (!user || user.balance < amount) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    // desconta saldo
    user.balance -= amount;
    await user.save();

    // cria pedido
    const withdraw = new Withdrawal({
      userId,
      amount,
      wallet
    });

    await withdraw.save();

    res.json({ success: true, message: "Pedido de saque enviado" });

  } catch (err) {
    res.status(500).json({ error: "Erro ao criar saque" });
  }
});

module.exports = router;
