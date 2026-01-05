const Plan = require("../models/Plan");
const User = require("../models/User"); // assumindo que você já tem modelo User

// dashboard do usuário
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.userId; // precisa do authMiddleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // buscar planos ativos do usuário
    const activePlans = user.activePlans || []; // array de planos ativos do usuário

    // buscar detalhes de cada plano
    const planDetails = await Promise.all(
      activePlans.map(async (planId) => {
        const plan = await Plan.findById(planId);
        return plan;
      })
    );

    res.status(200).json({
      balance: user.balance || 0,
      plans: planDetails,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dashboard", details: err.message });
  }
};
