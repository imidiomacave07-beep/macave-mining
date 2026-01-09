module.exports = async function requestWithdraw(req, res) {
  const { userId, amount, method, destination } = req.body;

  if (!global.users || !global.users[userId]) return res.status(400).json({ error: "Usuário não encontrado" });
  const user = global.users[userId];

  if (!amount || amount <= 0) return res.status(400).json({ error: "Valor inválido" });
  if (!destination || destination.length < 10) return res.status(400).json({ error: "Endereço inválido" });
  if (amount > user.balance) return res.status(400).json({ error: "Saldo insuficiente" });

  user.balance -= amount;
  if (!user.withdraws) user.withdraws = [];
  user.withdraws.push({
    amount,
    method,
    destination,
    date: new Date().toLocaleString()
  });

  res.json({ success: true, balance: user.balance, withdraws: user.withdraws });
};
