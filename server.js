const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const plans = require("./backend/plans");
const purchasePlan = require("./backend/purchase");
const requestWithdraw = require("./backend/withdraw");

// Rotas
app.get("/api/plans", (req, res) => res.json(plans));
app.post("/api/plans/buy", purchasePlan);
app.post("/api/withdraw/request", requestWithdraw);

// Função de lucro diário automática
function calcularLucroDiario() {
  const hoje = new Date().toDateString();
  Object.values(global.users || {}).forEach(user => {
    if (user.lastProfitDate === hoje) return;
    user.activePlans.forEach(plan => {
      const ganho = plan.price * (Math.random() * (plan.dailyMax - plan.dailyMin) + plan.dailyMin) / 100;
      user.balance += ganho;
    });
    user.lastProfitDate = hoje;
  });
}

// Rodar cálculo ao iniciar e a cada hora
if (!global.users) global.users = {};
calcularLucroDiario();
setInterval(calcularLucroDiario, 60 * 60 * 1000);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta", PORT);
});
