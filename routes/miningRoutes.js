const express = require('express');
const router = express.Router();

// Rota de teste para a mineração
router.get('/', (req, res) => {
  res.json({ message: 'Mining route OK' });
});

module.exports = router;
