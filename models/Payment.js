const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userEmail: String,
  plan: String,
  crypto: String, // BTC ou USDT
  txid: String,
  status: {
    type: String,
    default: "Pendente"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
