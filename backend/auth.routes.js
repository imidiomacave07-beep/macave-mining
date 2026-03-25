const express = require("express");
const router = express.Router();

let users = []; // Simulação de banco de dados

// Registro
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Usuário já existe" });
  }
  users.push({ username, password });
  res.json({ message: "Registro bem-sucedido" });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Usuário ou senha incorretos" });
  res.json({ message: "Login bem-sucedido" });
});

module.exports = router;
