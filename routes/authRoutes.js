const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTRO
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });

  res.json({ message: "Registrado com sucesso" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ message: "Senha incorreta" });
  }

  res.json({ message: "Login feito com sucesso" });
});

module.exports = router;
