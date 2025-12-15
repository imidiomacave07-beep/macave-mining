// server.js
const express = require("express");
const path = require("path");
require("dotenv").config();
require("./connect");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 🔴 TEMPORARIAMENTE COMENTADO se não existir
// const miningRoutes = require("./routes/miningRoutes");
// app.use("/api/mining", miningRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}`);
});
