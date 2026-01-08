const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./backend/auth");
const withdrawRoutes = require("./backend/withdraw");

const app = express(); // ✅ APP DEFINIDO PRIMEIRO
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/withdraw", withdrawRoutes);

// Rota teste (IMPORTANTE para Render)
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API rodando");
});

// Start server
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
