const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan: String,
  amount: Number,
  crypto: String,
  status: { type: String, default: "pendente" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
