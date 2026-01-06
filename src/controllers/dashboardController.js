const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });
    res.json({ username: user.username, balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
