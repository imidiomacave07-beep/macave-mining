const User = require("../models/User");
const Withdrawal = require("../models/Withdrawal");

exports.requestWithdrawal = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (amount > user.balance) {
    return res.status(400).json({ message: "Saldo insuficiente" });
  }

  // Cria o pedido de saque
  const withdrawal = new Withdrawal({
    userId: req.userId,
    amount
  });

  // Atualiza o saldo do usuário
  user.balance -= amount;
  await user.save();
  await withdrawal.save();

  res.json({ message: "Saque solicitado com sucesso", withdrawal });
};

exports.getWithdrawals = async (req, res) => {
  const withdrawals = await Withdrawal.find({ userId: req.userId });
  res.json(withdrawals);
};
