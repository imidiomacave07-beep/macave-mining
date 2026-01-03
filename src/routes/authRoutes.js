const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ id: user._id, name: user.name, email: user.email, balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "macave_secret", { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;
