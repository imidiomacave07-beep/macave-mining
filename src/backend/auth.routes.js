const express = require("express");
const router = express.Router();

// Simulando banco de dados
let users = [];

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email e senha são obrigatórios" });
  if (users.find(u => u.email === email)) return res.status(400).json({ error: "Usuário já existe" });

  users.push({ email, password, balance: 0, plans: [] });
  res.json({ message: "Registrado com sucesso" });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

  res.json({ message: "Login feito com sucesso", user });
});

module.exports = router;
