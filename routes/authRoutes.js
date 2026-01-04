const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // caminho correto

// Rota de teste para usuário autenticado
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

// Aqui você pode adicionar login, register e pagamento com criptomoeda

module.exports = router;
