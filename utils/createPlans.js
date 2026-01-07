const Plan = require("../models/Plan");

async function createDefaultPlans() {
  const count = await Plan.countDocuments();
  if (count > 0) return;

  await Plan.insertMany([
    {
      name: "Plano Básico",
      price: 50,
      dailyProfit: 2,
      duration: 30,
    },
    {
      name: "Plano Standard",
      price: 150,
      dailyProfit: 3,
      duration: 45,
    },
    {
      name: "Plano Premium",
      price: 500,
      dailyProfit: 5,
      duration: 60,
    },
  ]);

  console.log("✅ Planos criados com sucesso");
}

module.exports = createDefaultPlans;
