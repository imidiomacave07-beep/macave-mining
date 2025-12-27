const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

/* =========================
   CONFIGURAÇÕES BÁSICAS
========================= */
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   CONEXÃO COM MONGODB
========================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI não definida");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((err) => {
    console.error("❌ Erro ao conectar MongoDB:", err);
    process.exit(1);
  });

/* =========================
   ARQUIVOS ESTÁTICOS (HTML)
========================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   ROTAS HTML (FIX CANNOT GET)
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

/* =========================
   API TESTE
========================= */
app.get("/api/status", (req, res) => {
  res.json({ status: "Macave Mining API está rodando 🚀" });
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
