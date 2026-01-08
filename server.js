const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

/* ================= MONGODB ================= */
mongoose.connect(
  "mongodb+srv://macave-mining-1:Macave1234@cluster0.fqqvnqa.mongodb.net/macaveMining?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB conectado"))
 .catch(err => console.log("Erro MongoDB:", err));

/* ================= HELPERS ================= */
function generateWallet() {
  return "0x" + Math.random().toString(16).substr(2, 40);
}

function validateWallet(address, type) {
  switch (type) {
    case "TRC20":
      return /^T[a-zA-Z0-9]{33}$/.test(address);
    case "BTC":
      return /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address);
    case "BEP20":
    case "ERC20":
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    default:
      return false;
  }
}

/* ================= AUTH ================= */
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ email }))
    return res.status(400).json({ error: "Email já registrado" });

  const user = new User({ email, password, wallet: generateWallet() });
  await user.save();
  res.json({ message: "Registrado com sucesso!" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password)
    return res.status(400).json({ error: "Credenciais inválidas" });

  res.json({
    token: user._id,
    balance: user.balance,
    plans: user.plans,
    withdraws: user.withdraws,
    isAdmin: user.isAdmin,
    wallet: user.wallet
  });
});

/* ================= PLANOS ================= */
app.post("/api/plans/buy", async (req, res) => {
  const { userId, name, price, profit } = req.body;
  const user = await User.findById(userId);

  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });
  if (user.balance < price) return res.status(400).json({ error: "Saldo insuficiente" });

  user.balance -= price;
  user.plans.push({ name, profit, wallet: generateWallet() });
  await user.save();

  res.json({ balance: user.balance, plan: { name, profit } });
});

/* ================= SAQUE ================= */
app.post("/api/withdraw/request", async (req, res) => {
  const { userId, amount, method, destination } = req.body;

  if (!validateWallet(destination, method))
    return res.status(400).json({ error: "Endereço inválido para a rede selecionada" });

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });
  if (amount > user.balance) return res.status(400).json({ error: "Saldo insuficiente" });

  user.balance -= amount;
  user.withdraws.push({
    amount,
    method,
    destination,
    date: new Date().toLocaleString(),
    status: "pendente"
  });

  await user.save();
  res.json({ balance: user.balance });
});

/* ================= ADMIN ================= */
app.get("/api/admin/users", async (req, res) => {
  const admin = await User.findById(req.headers.authorization);
  if (!admin || !admin.isAdmin)
    return res.status(403).json({ error: "Acesso negado" });

  res.json({ users: await User.find() });
});

/* ================= START ================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Macave Mining API rodando"));
