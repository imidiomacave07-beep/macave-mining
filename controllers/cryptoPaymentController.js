const Withdrawal = require("../models/Withdrawal");

// Simulação de pagamento em criptomoeda
exports.processCryptoWithdrawal = async (req, res) => {
  const { withdrawalId, cryptoAddress } = req.body;

  const withdrawal = await Withdrawal.findById(withdrawalId);
  if (!withdrawal) {
    return res.status(404).json({ message: "Saque não encontrado" });
  }

  if (withdrawal.status !== "pending") {
    return res.status(400).json({ message: "Saque já processado" });
  }

  // Aqui você chamaria a API real de pagamentos em cripto
  // Simulação:
  const success = true; // substitua pela resposta da API real

  if (success) {
    withdrawal.status = "completed";
    await withdrawal.save();
    return res.json({ message: `Saque enviado para ${cryptoAddress}`, withdrawal });
  } else {
    withdrawal.status = "rejected";
    await withdrawal.save();
    return res.status(500).json({ message: "Falha ao processar o pagamento" });
  }
};
