const plans = require("./plans");

module.exports = (req, res) => {
  const { userId, planId } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(400).json({ error: "Plano não encontrado" });
  }

  if (!global.users) global.users = {};
  if (!global.users[userId]) {
    global.users[userId] = {
      balance: 0,
      activePlans: [],
      withdraws: []
    };
  }

  global.users[userId].activePlans.push(plan);
  global.users[userId].balance += plan.price;

  res.json({
    success: true,
    plan: plan,
    balance: global.users[userId].balance
  });
};
