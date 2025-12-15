const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../User");

// Registro
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    res.json({
      message: "Login bem-sucedido",
      user: { username: user.username }
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
