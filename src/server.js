const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/macave-mining")
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Erro MongoDB:", err));

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Servir arquivos públicos
app.use(express.static(path.join(__dirname, "../public")));

// Rota dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// Porta
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
