const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

const plans = require("./data/plans");
const users = require("./data/users");

app.use(express.json());
app.use(express.static("public"));

/* ======================
   LISTAR PLANOS
====================== */
app.get("/api/plans", (req, res) => {
  res.json(plans);
});

/* ======================
   SALDO
====================== */
app.get("/api/balance", (req, res) => {
  const user = users["teste123"];
  res.json({ balance: user.balance.toFixed(2) });
});

/* ======================
   COMPRAR PLANO
====================== */
app.post("/api/purchase", (req, res) => {
  const { userId, planId } = req.body;

  const user = users[userId];
  const plan = plans.find(p => p.id === planId || p.id === planId);

  if (!user || !plan) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  if (user.balance < plan.price) {
    return res.status(400).json({ message: "Saldo insuficiente" });
  }

  user.balance -= plan.price;

  user.plans.push({
    ...plan,
    startDate: Date.now(),
    lastPaid: Date.now()
  });

  res.json({ message: "Plano comprado com sucesso!" });
});

/* ======================
   MINERAÇÃO AUTOMÁTICA
====================== */
setInterval(() => {
  Object.values(users).forEach(user => {
    user.plans.forEach(plan => {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (now - plan.lastPaid >= oneDay) {
        const profit = (plan.price * plan.dailyProfit) / 100;
        user.balance += profit;
        plan.lastPaid = now;
        console.log("Lucro gerado:", profit);
      }
    });
  });
}, 60 * 1000); // verifica a cada 1 minuto

app.listen(PORT, () => {
  console.log("🚀 Macave Mining rodando na porta", PORT);
});
