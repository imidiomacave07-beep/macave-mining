const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  balance: { type: Number, default: 0 },
  activePlans: { type: Array, default: [] },
  withdraws: { type: Array, default: [] }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Registrar
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Campos obrigatórios" });

  const exists = await User.findOne({ username });
  if (exists)
    return res.status(400).json({ error: "Usuário já existe" });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();

  res.json({ message: "Usuário registrado com sucesso" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ error: "Usuário não encontrado" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(400).json({ error: "Senha incorreta" });

  res.json({ message: "Login OK", userId: user._id });
});

// Admin – listar usuários
router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = router;
