const express = require("express");
const router = express.Router();

const User = require("../models/User");
const MiningData = require("../models/MiningData");
const { calculateEarnings } = require("../services/miningCalculator");
const { logAudit } = require("../services/auditLogger");

// ======================
// ⚡ RECEBER HASHRATE
// ======================
router.post("/update", async (req, res) => {
  try {
    const { userId, hashrate } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilizador não encontrado" });
    }

    // ⚡ calcular ganhos
    const earnings = calculateEarnings(hashrate);

    // 💾 guardar histórico de mineração
    await MiningData.create({
      userId,
      hashrate,
      earnings
    });

    // 💰 atualizar saldo do utilizador
    user.balance += earnings;
    await user.save();

    // 🧾 auditoria
    await logAudit(
      "mining",
      userId,
      earnings,
      user.balance
    );

    res.json({
      success: true,
      hashrate,
      earnings,
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
