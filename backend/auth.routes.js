const express = require("express");
const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  // Simulação (depois ligamos ao MongoDB)
  return res.json({
    message: "Login bem-sucedido",
    token: "fake-token",
  });
});

// REGISTRO
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  return res.json({
    message: "Registro realizado com sucesso",
  });
});

module.exports = router;
