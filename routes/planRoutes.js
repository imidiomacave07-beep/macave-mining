const express = require("express");
const Plan = require("../models/Plan");
const Purchase = require("../models/Purchase");

const router = express.Router();

/* CRIAR PLANOS (executa 1 vez) */
router.get("/seed", async (req, res) => {
  await Plan.deleteMany();

  await Plan.insertMany([
    { name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
    { name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
    { name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
  ]);

  res.json({ message: "Planos criados" });
});

/* LISTAR PLANOS */
router.get("/", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

/* COMPRAR PLANO */
router.post("/buy", async (req, res) => {
  const { userId, planId } = req.body;

  await Purchase.create({ userId, planId });

  res.json({ message: "Plano comprado com sucesso" });
});

module.exports = router;
