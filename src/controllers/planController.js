const Plan = require("../models/Plan");

// criar novo plano
exports.createPlan = async (req, res) => {
  try {
    const { name, price, dailyProfit, durationDays } = req.body;

    const plan = new Plan({ name, price, dailyProfit, durationDays });
    await plan.save();

    res.status(201).json({ message: "Plano criado com sucesso", plan });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar plano", details: err.message });
  }
};

// listar todos os planos
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar planos", details: err.message });
  }
};
