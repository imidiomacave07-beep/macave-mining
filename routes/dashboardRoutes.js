const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('purchasedPlans');
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json({
    balance: user.balance,
    purchasedPlans: user.purchasedPlans
  });
});

module.exports = router;
