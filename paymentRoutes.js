const express = require("express");
const router = express.Router();

// rota de teste
router.get("/", (req, res) => {
  res.json({ message: "API de pagamentos funcionando!" });
});

// rota de pagamento via criptomoeda (exemplo)
router.post("/crypto", (req, res) => {
  const { userId, amount } = req.body;

  // lógica de pagamento via crypto aqui
  res.json({ status: "sucesso", userId, amount });
});

module.exports = router;
