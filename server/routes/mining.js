const express = require("express");
const router = express.Router();

const User = require("../models/User");
const MiningData = require("../models/MiningData");
const { calculateEarnings } = require("../services/miningCalculator");
const { logAudit } = require("../services/auditLogger");

// ======================
// ⚡ MINERAÇÃO SEGURA
// ======================
router.post("/update", async (req, res) => {
  try {
    const { userId, hashrate } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilizador não encontrado" });
    }

    // 🔐 VERIFICAR STATUS
    if (user.miningStatus !== "ACTIVE") {
      return res.status(403).json({
        error: "Mineração não permitida"
      });
    }

    // ⛔ PROTEÇÃO ANTI-SPAM (evita mineração duplicada)
    const lastMining = await MiningData.findOne({ userId })
      .sort({ createdAt: -1 });

    if (lastMining) {
      const diff =
        Date.now() - new Date(lastMining.createdAt).getTime();

      // bloqueia se tentar minerar em menos de 10 segundos
      if (diff < 10000) {
        return res.status(429).json({
          error: "Too many mining requests"
        });
      }
    }

    // ⚡ cálculo seguro
    const earnings = calculateEarnings(hashrate);

    // 💾 guardar histórico
    await MiningData.create({
      userId,
      hashrate,
      earnings
    });

    // 💰 atualizar saldo de forma segura
    user.balance = Number(user.balance) + Number(earnings);
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
