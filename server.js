// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // para acessar HTML, CSS, JS

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado!"))
.catch(err => console.log("Erro MongoDB:", err));

// Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
  plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }]
});

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  dailyProfit: Number,
  duration: Number
});

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Plan = mongoose.model("Plan", planSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "macave_secret";

// --- Rotas --- //

// Registro
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "Usuário já existe ou erro no registro." });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Credenciais inválidas." });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Credenciais inválidas." });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Login bem-sucedido!", token, userId: user._id });
});

// Retornar planos
app.get("/api/plans", async (req, res) => {
  let plans = await Plan.find();
  if (plans.length === 0) {
    // Se não houver planos, criamos alguns padrão
    plans = await Plan.insertMany([
      { name: "Bronze", price: 10, dailyProfit: 2, duration: 7 },
      { name: "Prata", price: 25, dailyProfit: 3, duration: 15 },
      { name: "Ouro", price: 50, dailyProfit: 5, duration: 30 }
    ]);
  }
  res.json(plans);
});

// Comprar plano
app.post("/api/purchase", async (req, res) => {
  const { userId, planId } = req.body;
  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);
    if (!user || !plan) return res.status(400).json({ error: "Usuário ou plano não encontrado." });

    if (user.balance < plan.price) {
      return res.status(400).json({ error: "Saldo insuficiente." });
    }

    user.balance -= plan.price;
    user.plans.push(plan._id);
    await user.save();

    await Purchase.create({ userId, planId });

    res.json({ message: `Plano ${plan.name} comprado com sucesso!`, balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: "Erro ao comprar plano." });
  }
});

// Dashboard do usuário
app.get("/api/dashboard/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("plans");
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
    res.json({
      username: user.username,
      balance: user.balance,
      plans: user.plans
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao carregar dashboard." });
  }
});

// Servir arquivos HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});
app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Rodar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
