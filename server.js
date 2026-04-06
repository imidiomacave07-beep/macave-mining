const express = require("express");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

/* ===============================
   PROTEÇÃO CONTRA MUITAS REQUISIÇÕES
================================ */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Too many requests, please try again later."
});

app.use(limiter);

/* ===============================
   ROTA PRINCIPAL
================================ */

app.get("/", (req, res) => {
  res.send("Macave Mining Platform Online 🚀");
});

/* ===============================
   STATUS DO SERVIDOR
================================ */

app.get("/status", (req, res) => {
  res.json({
    platform: "Macave Mining",
    status: "online",
    time: new Date()
  });
});

/* ===============================
   EXEMPLO DE CRIPTOGRAFIA DE SENHA
================================ */

app.post("/encrypt-password", async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({
      message: "Password encrypted successfully",
      hash: hashedPassword
    });
  } catch (error) {
    res.status(500).json({ error: "Encryption error" });
  }
});

/* ===============================
   EXEMPLO DE REGISTRO DE USUÁRIO
================================ */

let users = [];

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
      dailyProfit: 0
    };

    users.push(newUser);

    res.json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: "Registration error" });
  }
});

/* ===============================
   LISTAR USUÁRIOS (ADMIN)
================================ */

app.get("/admin/users", (req, res) => {
  res.json(users);
});

/* ===============================
   INICIAR SERVIDOR
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("Macave Mining Server Started");
  console.log("Server running on port:", PORT);
  console.log("Check status at /status");
  console.log("=================================");
});
