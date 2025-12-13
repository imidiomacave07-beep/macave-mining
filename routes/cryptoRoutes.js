const express = require("express");
const router = express.Router();

/**
 * Criar pedido de pagamento em criptomoeda
 * POST /api/crypto/create
 */
router.post("/create", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res.json({
        success: false,
        message: "Valor não informado"
      });
    }

    // Simulação de pagamento crypto (modo simples)
    const payment = {
      id: "CRYPTO_" + Date.now(),
      amount,
      currency: currency || "USDT",
      wallet_address: process.env.CRYPTO_WALLET_ENDERECO,
      status: "PENDING",
      created_at: new Date()
    };

    res.json({
      success: true,
      message: "Pagamento crypto criado",
      payment
    });

  } catch (error) {
    console.error("Erro Crypto:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar pagamento crypto"
    });
  }
});

/**
 * Callback de confirmação (opcional)
 * POST /api/crypto/callback
 */
router.post("/callback", async (req, res) => {
  try {
    // Aqui receberia confirmação da blockchain / gateway
    console.log("Callback crypto recebido:", req.body);

    res.json({
      success: true,
      message: "Callback recebido com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro no callback crypto"
    });
  }
});

module.exports = router;
