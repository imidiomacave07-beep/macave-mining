// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// caminho relativo correto para o middleware
const authMiddleware = require("../middleware/authMiddleware");

// rota de teste do usuário
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

module.exports = router;
