const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); 

// ---------------- Conexão MongoDB ----------------
const mongoURI = "mongodb+srv://macave-mining-1:Macave1234@cluster0.fqqvnqa.mongodb.net/macaveMining?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("MongoDB conectado com sucesso!"))
  .catch(err=>console.log("Erro ao conectar no MongoDB:", err));

// ---------------- Helpers ----------------
function generateWallet() {
  return "0x" + Math.random().toString(16).substr(2, 40).toUpperCase();
}

// ---------------- Rotas ----------------

// Registro
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({error:"Email já registrado"});

    const user = new User({
      email,
      password,
      wallet: generateWallet()
    });
    await user.save();
    res.json({message:"Registrado com sucesso!"});
  } catch(err) {
    res.status(500).json({error:"Erro no servidor"});
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user || user.password !== password)
      return res.status(400).json({error:"Credenciais inválidas"});

    res.json({
      message:"Login bem-sucedido",
      token: user._id,
      isAdmin: user.isAdmin,
      wallet: user.wallet,
      balance: user.balance,
      plans: user.plans,
      withdraws: user.withdraws
    });
  } catch(err) {
    res.status(500).json({error:"Erro no servidor"});
  }
});

// Comprar plano
app.post("/api/plans/buy", async (req, res) => {
  const { userId, planId, name, price, profit } = req.body;
  try {
    const user = await User.findById(userId);
    if(!user) return res.status(400).json({error:"Usuário não encontrado"});
    if(user.balance < price) return res.status(400).json({error:"Saldo insuficiente"});

    user.balance -= price;
    const newPlan = { id: planId, name, profit, wallet: generateWallet() };
    user.plans.push(newPlan);
    await user.save();

    res.json({ message:`Plano ${name} comprado!`, plan:newPlan, balance:user.balance });
  } catch(err) {
    res.status(500).json({error:"Erro no servidor"});
  }
});

// Solicitar saque
app.post("/api/withdraw/request", async (req,res)=>{
  const { userId, amount, method, destination } = req.body;
  try {
    const user = await User.findById(userId);
    if(!user) return res.status(400).json({error:"Usuário não encontrado"});
    if(amount > user.balance) return res.status(400).json({error:"Saldo insuficiente"});

    user.balance -= amount;
    user.withdraws.push({
      amount,
      method,
      destination,
      date: new Date().toLocaleString(),
      status: "pendente"
    });
    await user.save();
    res.json({ message:"Saque solicitado!", balance:user.balance });
  } catch(err) {
    res.status(500).json({error:"Erro no servidor"});
  }
});

// Admin: lista usuários
app.get("/api/admin/users", async (req,res)=>{
  const adminId = req.headers.authorization;
  try {
    const admin = await User.findById(adminId);
    if(!admin || !admin.isAdmin) return res.status(403).json({error:"Acesso negado"});

    const list = await User.find({}, "email balance wallet plans withdraws");
    res.json({users:list});
  } catch(err) {
    res.status(500).json({error:"Erro no servidor"});
  }
});

// Serve frontend
app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"public/index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Macave Mining API rodando na porta ${PORT}`));
