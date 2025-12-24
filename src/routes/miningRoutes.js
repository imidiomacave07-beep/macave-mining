const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/mine', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const earned = Math.floor(Math.random() * 10);
    user.balance += earned;
    await user.save();

    res.json({
      message: 'Mineração concluída',
      earned,
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
