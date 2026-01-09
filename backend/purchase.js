const plans = require("./plans");

module.exports = async function purchasePlan(req, res) {
  const { userId, planId } = req.body;

  const plan = plans.find(p => p.id === planId);
  if (!plan) return res.status(400).json({ error: "Plano inválido" });

  // SIMPLES (sem DB complexo por agora)
  res.json({
    success: true,
    message: "Plano comprado com sucesso",
    plan
  });
};
