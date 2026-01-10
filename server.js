// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir a pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
const plans = require("./backend/plans");
const purchasePlan = require("./backend/purchase");

app.get("/api/plans", (req, res) => res.json(plans));
app.post("/api/plans/buy", purchasePlan);

// Porta do Render ou local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta", PORT);
});
