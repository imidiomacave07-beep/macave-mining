app.post("/api/purchase", async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    res.json({ message: "Plano comprado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao comprar plano" });
  }
});
