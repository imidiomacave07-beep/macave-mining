const Withdrawal = require("./models/Withdrawal");

app.post("/api/withdraw", async (req, res) => {
  try {
    const { userId, amount, mpesaNumber } = req.body;

    if (!amount || amount <= 0) {
      return res.json({ message: "Valor inválido" });
    }

    const user = await User.findById(userId);

    if (!user || user.balance < amount) {
      return res.json({ message: "Saldo insuficiente" });
    }

    user.balance -= amount;
    await user.save();

    const withdrawal = new Withdrawal({
      userId,
      amount,
      mpesaNumber
    });

    await withdrawal.save();

    res.json({ message: "Pedido de saque enviado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro no saque" });
  }
});
