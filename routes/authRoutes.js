const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// login simulado
router.post("/login", (req, res) => {
  // gera token de teste
  const token = require("jsonwebtoken").sign(
    { id: "12345" },
    process.env.JWT_SECRET || "macave_secret",
    { expiresIn: "1h" }
  );
  res.json({ token });
});

// rota para obter dados do usuário
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

module.exports = router;
