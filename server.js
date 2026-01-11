const express = require("express");
const cors = require("cors");

// ✅ app DEFINIDO AQUI
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ==========================
// PLANOS
// ==========================
const plans = require("./backend/plans");

// listar planos
app.get("/api/plans", (req, res) => {
  res.json(plans);
});

// ==========================
// SERVIDOR
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${PORT}`);
});
