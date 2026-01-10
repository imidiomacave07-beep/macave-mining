// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir HTML/CSS/JS
app.use(express.static(path.join(__dirname, "public")));

// Importar planos e compra
const plans = require("./backend/plans");
const purchasePlan = require("./backend/purchase");

// Rotas
app.get("/api/plans", (req, res) => res.json(plans));
app.post("/api/plans/buy", purchasePlan);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta", PORT);
});
