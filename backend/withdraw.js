module.exports = async function requestWithdraw(req, res) {
  const { userId, amount, method, destination } = req.body;
  const user = global.users[userId];

  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });
  if (!amount || amount <= 0) return res.status(400).json({ error: "Valor inválido" });
  if (!destination || destination.length < 10) return res.status(400).json({ error: "Endereço inválido" });

  const limiteSaque = 200; // Máximo por saque
  if (amount > user.balance || amount > limiteSaque) return res.status(400).json({ error: "Saque acima do permitido" });

  user.balance -= amount;
  user.withdraws.push({ amount, method, destination, date: new Date().toLocaleString() });
  res.json({ success: true, balance: user.balance, withdraws: user.withdraws });
};
