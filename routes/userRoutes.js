const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Registrar usuário
router.post('/register', register);

// Login do usuário
router.post('/login', login);

// Mineração simulada
router.post('/mine', async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // autenticação JWT necessária
    const earned = Math.floor(Math.random() * 10); // ganho simulado
    user.balance += earned;
    await user.save();
    res.json({ message: 'Mineração concluída', earned, balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
