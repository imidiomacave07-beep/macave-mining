const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * REGISTER
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se já existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografa senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria usuário
    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * LOGIN
 */
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Procura usuário
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Compara senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gera token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
