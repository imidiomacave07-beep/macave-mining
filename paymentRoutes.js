const express = require("express");
const router = express.Router();

// Rota de teste de pagamento
router.get("/", (req, res) => {
  res.json({ message: "API de pagamentos funcionando!" });
});

// Exemplo de rota de pagamento com criptomoeda
router.post("/crypto", (req, res) => {
  const { userId, amount } = req.body;
  // Aqui você adiciona lógica de pagamento via crypto
  res.json({ status: "sucesso", userId, amount });
});

module.exports = router;
