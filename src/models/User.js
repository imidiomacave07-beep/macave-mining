exports.payWithCrypto = (req, res) => {
  const { userId, amount, currency } = req.body;
  // Aqui você conecta à API de cripto real
  res.json({ message: `Pagamento de ${amount} ${currency} recebido para ${userId}` });
};
