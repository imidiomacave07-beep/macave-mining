const Plan = require("../models/Plan");

async function seedPlans() {
  const count = await Plan.countDocuments();
  if (count > 0) return;

  await Plan.insertMany([
    {
      name: "Plano Básico",
      price: 10,
      dailyProfit: 1,
      durationDays: 30
    },
    {
      name: "Plano Médio",
      price: 50,
      dailyProfit: 6,
      durationDays: 30
    },
    {
      name: "Plano Premium",
      price: 100,
      dailyProfit: 15,
      durationDays: 30
    }
  ]);

  console.log("✅ Planos criados com sucesso");
}

module.exports = seedPlans;
