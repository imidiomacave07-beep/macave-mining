const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User"); // supondo que você já tem o model User

// comprar um plano
router.post("/", async (req, res) => {
  const { userId, planId } = req.body;

  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    if (!user || !plan) {
      return res.status(404).json({ error: "Usuário ou plano não encontrado" });
    }

    // adicionar plano ao usuário
    if (!user.plans) user.plans = [];
    user.plans.push({
      plan: plan._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
      dailyProfit: plan.dailyProfit,
      price: plan.price
    });

    await user.save();

    res.json({ message: "Plano comprado com sucesso!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao comprar o plano" });
  }
});

module.exports = router;
