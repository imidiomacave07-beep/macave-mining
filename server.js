const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Configurações
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve os HTML

// Mock database (apenas para teste)
let users = [];
let plans = [
  { _id: "1", name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
  { _id: "2", name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
  { _id: "3", name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
];
let purchases = [];

// ===== Rotas =====

// Registro
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Preencha todos os campos." });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: "Usuário já existe." });

  const user = { id: `${users.length + 1}`, username, password, balance: 0 };
  users.push(user);
  res.json({ message: "Registro realizado com sucesso!", userId: user.id });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ message: "Credenciais inválidas." });
  res.json({ message: "Login bem-sucedido!", userId: user.id });
});

// Retornar planos
app.get("/api/plans", (req, res) => {
  res.json(plans);
});

// Comprar plano
app.post("/api/purchase", (req, res) => {
  const { userId, planId } = req.body;
  const user = users.find(u => u.id === userId);
  const plan = plans.find(p => p._id === planId);
  if (!user || !plan) return res.status(400).json({ message: "Usuário ou plano inválido." });

  purchases.push({ userId, planId, date: new Date() });
  user.balance += plan.dailyProfit; // simula crédito inicial
  res.json({ message: `Plano ${plan.name} comprado com sucesso!` });
});

// Inicia servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
