const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Registrar usuário
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email já cadastrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "macave_secret");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "macave_secret");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota protegida
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ id: user._id, name: user.name, email: user.email, balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
