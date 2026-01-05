const express = require("express");
const router = express.Router();

// rota de teste para planos
router.get("/", (req, res) => {
  res.json({
    plans: [
      { id: 1, name: "Plano Bronze", profit: 5 },
      { id: 2, name: "Plano Prata", profit: 10 },
      { id: 3, name: "Plano Ouro", profit: 20 }
    ]
  });
});

// rota para detalhes de um plano
router.get("/:id", (req, res) => {
  const planId = req.params.id;
  res.json({ id: planId, name: `Plano ${planId}`, profit: planId * 5 });
});

module.exports = router;
