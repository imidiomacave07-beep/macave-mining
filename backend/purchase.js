const plans = require("./plans");

module.exports = async function purchasePlan(req, res) {
  const { userId, planId } = req.body;
  const plan = plans.find(p => p.id === planId);
  if (!plan) return res.status(400).json({ error: "Plano inválido" });

  // Simula DB do usuário
  if (!global.users) global.users = {};
  if (!global.users[userId]) global.users[userId] = { balance: 0, withdraws: [], activePlans: [] };

  global.users[userId].activePlans.push(plan);
  global.users[userId].balance += plan.price;

  res.json({
    success: true,
    message: "Plano comprado com sucesso",
    plan
  });
};
