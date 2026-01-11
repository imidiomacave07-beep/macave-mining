const express = require("express");
const path = require("path");

const app = express();

// JSON
app.use(express.json());

// ✅ SERVIR A PASTA PUBLIC (ISTO É A CHAVE)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
const authRoutes = require("./backend/auth.routes");
app.use("/api/auth", authRoutes);

// Rota principal (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta " + PORT);
});
