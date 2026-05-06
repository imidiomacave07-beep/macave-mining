const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { logAudit } = require("../services/auditLogger");
const { calculateRisk } = require("../services/fraudEngine");

// ======================
// 💸 CRIAR SAQUE
// ======================
router.post("/", async (req, res) => {
  try {
    const { userId, amount, twofaVerified } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilizador não encontrado" });
    }

    // 💰 VERIFICAR SALDO
    if (user.balance < amount) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    // 🔐 VERIFICAR 2FA
    if (!twofaVerified) {
      return res.status(403).json({ error: "2FA obrigatório para saque" });
    }

    // 🧠 ANTIFRAUDE
    const risk = calculateRisk(user);

    if (risk > 70) {
      return res.status(403).json({
        error: "Saque bloqueado por segurança (alto risco)"
      });
    }

    // 💸 CRIAR TRANSAÇÃO
    const tx = await Transaction.create({
      userId,
      type: "withdraw",
      amount,
      status: "completed"
    });

    // 💰 ATUALIZAR SALDO
    user.balance -= amount;
    await user.save();

    // 🧾 AUDITORIA
    await logAudit(
      "withdraw",
      userId,
      amount,
      user.balance
    );

    res.json({
      success: true,
      message: "Saque aprovado",
      balance: user.balance,
      tx
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
