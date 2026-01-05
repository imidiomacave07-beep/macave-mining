const Plan = require("../models/Plan");
const User = require("../models/User");

// comprar plano
exports.buyPlan = async (req, res) => {
  const { amount } = req.body;

  if (amount < 10) {
    return res.status(400).json({ message: "Valor mínimo 10 USD" });
  }

  const plan = new Plan({
    userId: req.userId,
    amount,
    dailyRate: 0.03 // 3% ao dia
  });

  await plan.save();
  res.json({ message: "Plano ativado com sucesso" });
};
