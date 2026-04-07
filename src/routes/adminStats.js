const express = require("express");
const router = express.Router();

// Exemplo de dados (depois usar banco real)
let users = [];
let deposits = [];
let withdrawals = [];

// Estatísticas do admin
router.get("/admin/stats", (req, res) => {
  const totalUsers = users.length;

  const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const totalHashrate = users.reduce((sum, user) => sum + (user.hashRate || 0), 0);

  res.json({
    totalUsers,
    totalDeposits,
    totalWithdrawals,
    totalHashrate
  });
});

module.exports = router;
