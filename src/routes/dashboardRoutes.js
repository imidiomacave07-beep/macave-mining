const express = require("express");
const router = express.Router();

// rota de teste do dashboard
router.get("/", (req, res) => {
  res.json({ message: "Dashboard funcionando!" });
});

// rota de estatísticas exemplo
router.get("/stats", (req, res) => {
  res.json({
    totalUsers: 100,
    totalPlans: 5,
    dailyProfit: 250
  });
});

module.exports = router;
