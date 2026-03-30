const plans = [
  { name: 'Básico', min: 10, max: 499, term: 30, dailyROI: 1.5 },
  { name: 'Intermediário', min: 500, max: 1999, term: 30, dailyROI: 2 },
  { name: 'Avançado', min: 2000, max: 5000, term: 30, dailyROI: 2.5 }
];

const { userBalances } = require('./cloud.controller');

exports.getPlans = (req, res) => res.json(plans);

exports.buyPlan = (req, res) => {
  const { userId, planName, amount } = req.body;
  const plan = plans.find(p => p.name === planName);

  if(!plan) return res.status(400).json({ message: 'Plano inválido' });
  if(amount < plan.min || amount > plan.max) return res.status(400).json({ message: 'Valor fora do permitido' });

  if(!userBalances[userId]) userBalances[userId] = { invested: 0, profit: 0 };
  userBalances[userId].invested += amount;

  res.json({ message: 'Plano comprado com sucesso! Lucro será atualizado automaticamente.', planName, amount });
};

exports.getUserBalance = (req, res) => {
  const userId = req.params.userId;
  const balance = userBalances[userId]?.profit || 0;
  res.json({ profit: balance.toFixed(2) });
};
