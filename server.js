const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Porta (Render fornece automaticamente)
const PORT = process.env.PORT || 10000;

// MongoDB (use a variável do Render)
const MONGO_URI = process.env.MONGO_URI;

// Teste simples
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API está online");
});

// Status
app.get("/api/status", (req, res) => {
  res.json({ status: "Macave Mining API está rodando 🚀" });
});

// Conexão MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar MongoDB:", err.message);
  });
