const express = require("express");
const router = express.Router();

const MiningData = require("../models/MiningData");

// ======================
// 📊 STATS DO UTILIZADOR
// ======================
router.get("/mining/:userId", async (req, res) => {
  try {
    const data = await MiningData.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    const totalEarnings = data.reduce(
      (sum, d) => sum + d.earnings,
      0
    );

    const avgHashrate =
      data.length > 0
        ? data.reduce((s, d) => s + d.hashrate, 0) / data.length
        : 0;

    res.json({
      totalEarnings,
      avgHashrate,
      history: data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
