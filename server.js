// server.js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("public")); // para login.html, dashboard.html etc.

const PORT = process.env.PORT || 10000;

// ---------------- Simulação de banco de dados ----------------
let users = [
  { _id: "user1", username: "teste", password: "1234", balance: 100, plans: [] }
];

const planos = [
  { _id: "bronze", name: "Plano Bronze", price: 10, dailyProfit: 2, duration: 7 },
  { _id: "prata", name: "Plano Prata", price: 25, dailyProfit: 3, duration: 15 },
  { _id: "ouro", name: "Plano Ouro", price: 50, dailyProfit: 5, duration: 30 }
];

// ---------------- Rotas de autenticação ----------------
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username))
    return res.status(400).json({ message: "Usuário já existe" });

  const newUser = { _id: "user" + (users.length + 1), username, password, balance: 100, plans: [] };
  users.push(newUser);
  res.json({ message: "Usuário registrado com sucesso!", userId: newUser._id });
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });
  res.json({ message: "Login bem-sucedido", userId: user._id, balance: user.balance });
});

// ---------------- Rotas de planos ----------------
app.get("/api/plans", (req, res) => {
  res.json(planos);
});

// ---------------- Rota de compras ----------------
app.post("/api/purchase", (req, res) => {
  const { userId, planId } = req.body;
  const user = users.find(u => u._id === userId);
  const plan = planos.find(p => p._id === planId);

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  if (!plan) return res.status(404).json({ message: "Plano não encontrado" });

  if (user.balance < plan.price)
    return res.status(400).json({ message: "Saldo insuficiente" });

  user.balance -= plan.price;
  user.plans.push({ ...plan, startDate: new Date() });

  res.json({ message: `Plano ${plan.name} comprado com sucesso!`, balance: user.balance });
});

// ---------------- Start do servidor ----------------
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
