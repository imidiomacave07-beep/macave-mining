const express = require("express");
const router = express.Router();

let withdrawals = [];

router.post("/", (req, res) => {
  const { username, amount } = req.body;
  withdrawals.push({ username, amount, status: "pendente" });
  res.json({ message: "Solicitação de saque enviada" });
});

router.get("/", (req, res) => {
  res.json(withdrawals);
});

module.exports = router;
