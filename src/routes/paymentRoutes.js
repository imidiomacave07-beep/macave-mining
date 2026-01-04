const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Payment = require("../models/Payment");

const router = express.Router();

// criar pedido de pagamento
router.post("/payment", authMiddleware, async (req, res) => {
  const { plan, amount, crypto } = req.body;

  const payment = await Payment.create({
    userId: req.userId,
    plan,
    amount,
    crypto
  });

  res.json({
    message: "Pedido criado",
    wallet: getWallet(crypto),
    payment
  });
});

function getWallet(crypto) {
  const wallets = {
    USDT: "TXYZ-EXEMPLO-USDT-ENDERECO",
    BTC: "bc1q-exemplo-btc",
    ETH: "0xExemploEthWallet"
  };
  return wallets[crypto];
}

module.exports = router;
