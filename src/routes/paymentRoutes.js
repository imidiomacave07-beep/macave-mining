const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

// Criar pagamento
router.post("/pay", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.json({ message: "Pagamento enviado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar pagamento" });
  }
});

// Listar pagamentos (admin)
router.get("/all", async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

module.exports = router;
