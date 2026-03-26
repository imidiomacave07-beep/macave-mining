const express = require('express');
const router = express.Router();

router.post('/buy', (req, res) => {
  const { planName } = req.body;
  if(!planName) return res.status(400).json({ message: 'Nenhum plano selecionado' });
  res.json({ message: `Plano ${planName} comprado com sucesso!` });
});

module.exports = router;
