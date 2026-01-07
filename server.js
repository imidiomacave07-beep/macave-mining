const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// middlewares
app.use(cors());
app.use(express.json());

// ===============================
// TESTE ONLINE
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API está online");
});

// ===============================
// PLANOS (fixos por enquanto)
// ===============================
const plans = [
  { _id: "1", name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
  { _id: "2", name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
  { _id: "3", name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
];

// ===============================
// LISTAR PLANOS
// ===============================
app.get("/api/plans", (req, res) => {
  res.json(plans);
});

// ===============================
// COMPRAR PLANO
// ===============================
app.post("/api/purchase", (req, res) => {
  const { userId, planId } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  const plan = plans.find(p => p._id === planId);

  if (!plan) {
    return res.status(404).json({ message: "Plano não encontrado" });
  }

  res.json({
    message: `Plano ${plan.name} comprado com sucesso!`
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
