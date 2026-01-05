const User = require("../models/User");

// listar usuários
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// atualizar saldo
exports.updateBalance = async (req, res) => {
  const { userId, balance } = req.body;

  await User.findByIdAndUpdate(userId, { balance });
  res.json({ message: "Saldo atualizado" });
};
