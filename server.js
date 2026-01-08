const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ==================== Banco de dados simulado ====================
let users = []; // {id, email, password, balance, isAdmin, wallet, plans, withdraws}

// ==================== Helpers ====================
function generateWallet() {
  return "0x" + Math.random().toString(16).substr(2, 40).toUpperCase();
}
function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

// ==================== ROTAS ====================

// Registro
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  if(findUserByEmail(email)) return res.status(400).json({error:"Email já registrado"});
  const newUser = {
    id: uuidv4(),
    email,
    password, // sem hash para simplificar, mas ideal seria bcrypt
    balance: 100, // saldo inicial
    isAdmin: false,
    wallet: generateWallet(),
    plans: [],
    withdraws: []
  };
  users.push(newUser);
  res.json({message:"Registrado com sucesso!"});
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if(!user || user.password !== password) return res.status(400).json({error:"Credenciais inválidas"});
  res.json({
    message:"Login bem-sucedido",
    token: user.id, // token simples
    isAdmin: user.isAdmin,
    wallet: user.wallet,
    balance: user.balance,
    plans: user.plans
  });
});

// Comprar plano
app.post("/api/plans/buy", (req, res) => {
  const { userId, planId, name, price, profit } = req.body;
  const user = users.find(u => u.id === userId);
  if(!user) return res.status(400).json({error:"Usuário não encontrado"});
  if(user.balance < price) return res.status(400).json({error:"Saldo insuficiente"});
  user.balance -= price;
  const newPlan = { id:planId, name, profit, wallet: generateWallet() };
  user.plans.push(newPlan);
  res.json({message:`Plano ${name} comprado!`, plan:newPlan, balance:user.balance});
});

// Solicitar saque
app.post("/api/withdraw/request", (req,res)=>{
  const { userId, amount, method, destination } = req.body;
  const user = users.find(u=>u.id===userId);
  if(!user) return res.status(400).json({error:"Usuário não encontrado"});
  if(amount > user.balance) return res.status(400).json({error:"Saldo insuficiente"});
  user.balance -= amount;
  user.withdraws.push({amount, date:new Date().toLocaleString(), method, destination});
  res.json({message:"Saque solicitado!", balance:user.balance});
});

// Admin: lista usuários
app.get("/api/admin/users", (req,res)=>{
  const adminId = req.headers.authorization;
  const admin = users.find(u=>u.id===adminId && u.isAdmin);
  if(!admin) return res.status(403).json({error:"Acesso negado"});
  const list = users.map(u=>({
    email: u.email,
    balance: u.balance,
    wallet: u.wallet,
    plans: u.plans,
    withdraws: u.withdraws
  }));
  res.json({users:list});
});

// ==================== Server ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Macave Mining API rodando na porta ${PORT}`));
