const plans = require("./backend/plans");

// rota para listar planos
app.get("/api/plans", (req, res) => {
  res.json(plans);
});

// rota para comprar plano (simples – MVP)
let userPlans = {};
let userBalance = {};

app.post("/api/plans/buy", (req, res) => {
  const { userId, planId } = req.body;

  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(400).json({ error: "Plano não encontrado" });
  }

  if (!userBalance[userId]) userBalance[userId] = 0;
  if (!userPlans[userId]) userPlans[userId] = [];

  if (userBalance[userId] < plan.price) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  userBalance[userId] -= plan.price;

  userPlans[userId].push({
    ...plan,
    startDate: new Date(),
    active: true
  });

  res.json({
    message: "Plano comprado com sucesso",
    balance: userBalance[userId],
    plans: userPlans[userId]
  });
});
