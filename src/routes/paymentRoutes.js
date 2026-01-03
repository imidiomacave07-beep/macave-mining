const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/crypto", authMiddleware, (req, res) => {
  const { amount, currency } = req.body;
  if (!amount || !currency) return res.status(400).json({ error: "Informe o valor e a moeda" });

  res.json({ message: `Pagamento de ${amount} ${currency} registrado com sucesso!`, status: "success" });
});

module.exports = router;
