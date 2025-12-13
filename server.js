// server.js
const express = require("express");
const path = require("path");
require("dotenv").config();
require("./connect"); // Conexão com MongoDB

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rota raiz abre diretamente test-register.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/test-register.html"));
});

// Rotas da API de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Outras rotas da plataforma (caso tenha)
const miningRoutes = require("./routes/miningRoutes");
app.use("/api/mining", miningRoutes);

// Escutar a porta
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}`);
});
