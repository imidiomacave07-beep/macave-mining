const express = require("express");
const router = express.Router();

// caminho correto para middleware
const authMiddleware = require("../middleware/authMiddleware");

// rota de teste
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

module.exports = router;
