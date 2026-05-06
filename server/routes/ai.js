const express = require("express");
const router = express.Router();
const MiningData = require("../models/MiningData");
const { predictProfit } = require("../services/aiProfitPredictor");

router.get("/predict/:userId", async (req, res) => {
  const history = await MiningData.find({
    userId: req.params.userId
  }).sort({ createdAt: 1 });

  const result = predictProfit(history);

  res.json(result);
});

module.exports = router;
