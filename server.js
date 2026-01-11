const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

/* =========================
   Middlewares
========================= */
app.use(express.json());
app.use(express.static("public"));

/* =========================
   ROTA PRINCIPAL (resolve Cannot GET /)
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API está ativa");
});

/* =========================
   PLANOS DE MINERAÇÃO (API)
========================= */
app.get("/api/plans", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Starter",
      price: 20,
      daily: "0.6% ao dia",
      duration: "30 dias"
    },
    {
      id: 2,
      name: "Basic",
      price: 50,
      daily: "0.8% ao dia",
      duration: "30 dias"
    },
    {
      id: 3,
      name: "Pro",
      price: 100,
      daily: "1% ao dia",
      duration: "40 dias"
    },
    {
      id: 4,
      name: "Advanced",
      price: 200,
      daily: "1.2% ao dia",
      duration: "45 dias"
    }
  ]);
});

/* =========================
   FRONTEND (dashboard)
========================= */
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${PORT}`);
});
