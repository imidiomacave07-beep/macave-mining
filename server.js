const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 10000;

/* ======================
   USUÁRIO SIMULADO
====================== */
let user = {
  id: "teste123",
  balance: 100,
  plans: []
};

/* ======================
   LISTAR PLANOS
====================== */
app.get("/api/plans", (req, res) => {
  res.json([
    { _id: "bronze", name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
    { _id: "prata", name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
    { _id: "ouro", name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
  ]);
});

/* ======================
   COMPRAR PLANO
====================== */
app.post("/api/purchase", (req, res) => {
  const { userId, planId } = req.body;

  const plans = {
    bronze: { name: "Plano Bronze", price: 10 },
    prata: { name: "Plano Prata", price: 25 },
    ouro: { name: "Plano Ouro", price: 50 }
  };

  const plan = plans[planId];

  if (!plan) {
    return res.status(400).json({ message: "Plano inválido" });
  }

  if (user.balance < plan.price) {
    return res.status(400).json({ message: "Saldo insuficiente" });
  }

  user.balance -= plan.price;
  user.plans.push(plan.name);

  res.json({
    message: "Plano comprado com sucesso!",
    saldo: user.balance,
    planos: user.plans
  });
});

/* ======================
   SALDO
====================== */
app.get("/api/balance", (req, res) => {
  res.json({ balance: user.balance });
});

/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
