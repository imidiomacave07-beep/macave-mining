const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { logAudit } = require("../services/auditLogger");

// ======================
// 💰 CRIAR DEPÓSITO
// ======================
router.post("/", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilizador não encontrado" });
    }

    // 🚫 VERIFICA CONTROLO DE DEPÓSITOS
    if (user.depositStatus !== "ACTIVE") {
      return res.status(403).json({
        error: "Depósitos bloqueados para este utilizador"
      });
    }

    // 💰 CRIAR TRANSAÇÃO
    const tx = await Transaction.create({
      userId,
      type: "deposit",
      amount,
      status: "completed"
    });

    // 💰 ATUALIZAR SALDO
    user.balance += amount;
    await user.save();

    // 🧾 AUDITORIA
    await logAudit(
      "deposit",
      userId,
      amount,
      user.balance
    );

    res.json({
      success: true,
      message: "Depósito confirmado",
      balance: user.balance,
      tx
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
