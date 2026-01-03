// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// Caminho correto
const authMiddleware = require("../middleware/authMiddleware");

// Rota de teste
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

module.exports = router;
