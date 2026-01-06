// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado!"))
.catch(err => console.error("Erro ao conectar MongoDB:", err));

// =======================
// MODELS
// =======================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// =======================
// PLANOS FIXOS
// =======================
const plans = [
  { id: 1, name: "Plano Básico", price: 10, dailyProfit: 0.5, duration: 30 },
  { id: 2, name: "Plano Pro", price: 50, dailyProfit: 3, duration: 30 },
  { id: 3, name: "Plano VIP", price: 100, dailyProfit: 7, duration: 30 }
];

// =======================
// ROTAS
// =======================

// Home API
app.get("/api", (req, res) => {
  res.send("Macave Mining API está online 🚀");
});

// Planos
app.get("/api/plans", (req, res) => {
  res.json(plans);
});

// Registro
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Preencha todos os campos" });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: "Usuário já existe" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.json({ message: "Usuário registrado com sucesso" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Preencha todos os campos" });

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Login bem-sucedido", token });
});

// Dashboard (exemplo)
app.get("/api/dashboard", (req, res) => {
  res.json({ balance: 0, activePlans: [] });
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
