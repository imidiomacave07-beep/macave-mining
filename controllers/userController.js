const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login bem-sucedido',
      token,
      user: {
        id: user._id,
        username: user.username,
        balance: user.balance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
