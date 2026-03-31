const express = require("express");
const router = express.Router();
const miningService = require("../services/mining.service");
const plans = require("../plans");

router.post("/buy/:planName", async (req, res) => {
  const plan = plans.find(p => p.name === req.params.planName);
  if (!plan) return res.status(404).send("Plano não encontrado");

  await miningService.startMining(plan.hashrate);

  res.send({ message: `Plano ${plan.name} comprado com ${plan.hashrate} TH/s` });
});

module.exports = router;
