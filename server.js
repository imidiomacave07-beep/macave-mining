const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 10000;

/* ======================
   PLANOS DISPONÍVEIS
====================== */
app.get("/api/plans", (req, res) => {
  res.json([
    {
      _id: "bronze",
      name: "Plano Bronze",
      price: 10,
      dailyProfit: 2,
      duration: 7
    },
    {
      _id: "prata",
      name: "Plano Prata",
      price: 25,
      dailyProfit: 3,
      duration: 15
    },
    {
      _id: "ouro",
      name: "Plano Ouro",
      price: 50,
      dailyProfit: 5,
      duration: 30
    }
  ]);
});

/* ======================
   COMPRAR PLANO
====================== */
app.post("/api/purchase", (req, res) => {
  const { userId, planId } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  res.json({
    message: "Plano comprado com sucesso!",
    planId
  });
});

/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
