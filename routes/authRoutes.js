const express = require("express");
const router = express.Router();

// Corrigido: pasta singular "middleware"
const authMiddleware = require("../middleware/authMiddleware");

// Rota de teste do usuário
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

module.exports = router;
