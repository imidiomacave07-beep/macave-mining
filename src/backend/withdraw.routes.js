const express = require("express");
const router = express.Router();

let withdraws = [];

// Solicitar saque
router.post("/request", (req, res) => {
  const { userId, amount, method, destination } = req.body;

  if (!amount || amount <= 0) return res.status(400).json({ error: "Valor inválido" });
  if (!destination || destination.length < 10) return res.status(400).json({ error: "Endereço de carteira inválido" });

  withdraws.push({ userId, amount, method, destination, date: new Date().toLocaleString() });
  res.json({ message: "Saque solicitado com sucesso", balance: 0 });
});

module.exports = router;
