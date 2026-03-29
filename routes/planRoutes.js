const express = require('express');
const router = express.Router();

const planos = [
  { id: 1, nome: "Plano Básico", dailyROI: 1.5, term: 30, minDeposit: 50, maxDeposit: 499 },
  { id: 2, nome: "Plano Premium", dailyROI: 2, term: 60, minDeposit: 500, maxDeposit: 4999 }
];

router.get('/', (req, res) => res.json(planos));
router.get('/:id', (req, res) => {
  const plano = planos.find(p => p.id === parseInt(req.params.id));
  if (!plano) return res.status(404).json({ message: "Plano não encontrado" });
  res.json(plano);
});

module.exports = router;
module.exports.planos = planos;
