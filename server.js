const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔴 SERVIR ARQUIVOS HTML
app.use(express.static(path.join(__dirname, "public")));

// ======================
// ROTAS DE TESTE API
// ======================

// Teste da API
app.get("/api", (req, res) => {
  res.json({ status: "Macave Mining API está online 🚀" });
});

// Login (simples, sem banco)
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      message: "Login bem-sucedido",
      user: { username }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Credenciais inválidas"
  });
});

// Register (simples)
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos"
    });
  }

  return res.json({
    success: true,
    message: "Usuário registrado com sucesso"
  });
});

// Dashboard (dados fake)
app.get("/api/dashboard", (req, res) => {
  res.json({
    saldo: 0,
    planos: []
  });
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
