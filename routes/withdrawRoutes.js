const express = require("express");
const Withdraw = require("../models/Withdraw");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// solicitar saque
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const { amount, crypto, wallet } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    const withdraw = await Withdraw.create({
      userId: req.userId,
      amount,
      crypto,
      wallet
    });

    res.json({
      message: "Pedido de saque enviado",
      withdraw
    });
  } catch (err) {
    res.status(500).json({ error: "Erro no saque" });
  }
});

module.exports = router;
