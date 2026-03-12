const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mock database (substituir por MongoDB real)
let users = [];

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = { email, password: hashed };
  users.push(user);
  res.json({ message: "Usuário registrado com sucesso!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ message: "Login bem-sucedido", token });
});

module.exports = router;
