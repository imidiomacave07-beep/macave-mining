const User = require('../models/User');

exports.mine = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado' });

    // ganho simulado
    const earned = Math.floor(Math.random() * 10) + 1;

    user.balance += earned;
    await user.save();

    res.json({
      message: 'Mineração concluída ⛏️',
      earned,
      balance: user.balance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
