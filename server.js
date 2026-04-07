const express = require("express");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const adminStats = require("./src/routes/adminStats");

const app = express();
app.use(express.json());

// Limite de requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
});
app.use(limiter);

// Rota principal
app.get("/", (req, res) => {
  res.send("Macave Mining Platform Online 🚀");
});

// Rota de status
app.get("/status", (req, res) => {
  res.json({
    platform: "Macave Mining",
    status: "online",
    time: new Date()
  });
});

// Criptografia de senha
app.post("/encrypt-password", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    res.json({ message: "Password encrypted successfully", hash: hashedPassword });
  } catch (error) {
    res.status(500).json({ error: "Encryption error" });
  }
});

// Usuários
let users = [];
let deposits = [];
let withdrawals = [];

// Registro de usuário
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      balance: 0,
      hashRate: 0,
      dailyProfit: 0,
      plan: null
    };

    users.push(newUser);

    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Registration error" });
  }
});

// Listar usuários (Admin)
app.get("/admin/users", (req, res) => {
  res.json(users);
});

// Conectar rota de estatísticas
app.use(adminStats);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("=================================");
  console.log("Macave Mining Server Started");
  console.log("Server running on port:", PORT);
  console.log("Check status at /status");
  console.log("=================================");
});
