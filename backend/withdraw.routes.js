const express = require("express");
const router = express.Router();

let withdraws = [];

router.post("/request", (req, res) => {
  const { userId, amount, method, destination } = req.body;
  if(!amount || !destination) return res.status(400).json({ error: "Dados inválidos" });

  withdraws.push({ userId, amount, method, destination, date: new Date().toLocaleString() });
  res.json({ message: "Saque solicitado com sucesso", withdraws });
});

router.get("/", (req, res) => {
  res.json(withdraws);
});

module.exports = router;
