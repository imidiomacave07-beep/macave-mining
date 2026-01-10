const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SERVIR A PASTA PUBLIC
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
const plans = require("./backend/plans");
const purchasePlan = require("./backend/purchase");
const requestWithdraw = require("./backend/withdraw");

app.get("/api/plans", (req, res) => res.json(plans));
app.post("/api/plans/buy", purchasePlan);
app.post("/api/withdraw/request", requestWithdraw);

// Porta correta para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta", PORT);
});
