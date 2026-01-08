const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [];
const secret = "seusegredo";

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  users.push({
    id: Date.now(),
    email,
    password, // ⚠️ sem hash TEMPORARIAMENTE
    balance: 0
  });

  res.json({ message: "Registro concluído" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login sucesso", token });
});

module.exports = router;
