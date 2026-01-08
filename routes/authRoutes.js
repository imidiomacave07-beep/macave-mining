const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: "Usuário já existe" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash });

  res.json({ message: "Registro feito com sucesso" });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Credenciais inválidas" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userId: user._id });
});

/* DASHBOARD */
router.get("/me/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = router;
