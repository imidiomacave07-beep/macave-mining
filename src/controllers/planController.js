const Plan = require('../models/Plan');
const User = require('../models/User');

exports.getPlans = async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
};

exports.purchasePlan = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    if (!user || !plan) return res.status(400).json({ message: 'Usuário ou plano não encontrado' });

    if (user.balance < plan.price) return res.status(400).json({ message: 'Saldo insuficiente' });

    user.balance -= plan.price;
    user.purchasedPlans.push(plan._id);
    await user.save();

    res.json({ message: `Plano ${plan.name} comprado com sucesso!` });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao comprar plano', error: err.message });
  }
};
