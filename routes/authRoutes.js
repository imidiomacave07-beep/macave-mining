const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// login simples (teste)
router.post("/login", (req, res) => {
  res.json({
    token: "TOKEN_FAKE_PARA_TESTE"
  });
});

// rota protegida
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    balance: 0
  });
});

module.exports = router;
