const express = require("express");
const router = express.Router();

const User = require("../models/User");
const MiningData = require("../models/MiningData");
const { calculateEarnings } = require("../services/miningCalculator");
const { logAudit } = require("../services/auditLogger");

const miningLimiter = require("../middleware/rateLimiter");
const verifyMiningSignature = require("../middleware/securityMiddleware");
const { isProcessing, lock, unlock } = require("../services/miningQueue");

// ======================
// ⚡ MINERAÇÃO NÍVEL 3
// ======================
router.post(
  "/update",
  miningLimiter,
  verifyMiningSignature,
  async (req, res) => {
    try {
      const { userId, hashrate } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // 🔐 STATUS CHECK
      if (user.miningStatus !== "ACTIVE") {
        return res.status(403).json({ error: "Mining blocked" });
      }

      // ⛔ LOCK (evita concorrência)
      if (isProcessing(userId)) {
        return res.status(429).json({
          error: "Mining already processing"
        });
      }

      lock(userId);

      // ⚡ cálculo
      const earnings = calculateEarnings(hashrate);

      // 💾 salvar
      await MiningData.create({
        userId,
        hashrate,
        earnings
      });

      // 💰 atualizar saldo com segurança
      user.balance = Number(user.balance) + Number(earnings);
      await user.save();

      // 🧾 audit
      await logAudit(
        "mining",
        userId,
        earnings,
        user.balance
      );

      unlock(userId);

      res.json({
        success: true,
        earnings,
        balance: user.balance
      });

    } catch (err) {
      unlock(req.body.userId);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
