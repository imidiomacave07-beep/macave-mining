const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../User');

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ message: 'Preencha todos os campos' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Usuário já existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    res.status(200).json({ message: 'Login bem-sucedido', user: { username: user.username, points: user.points } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
