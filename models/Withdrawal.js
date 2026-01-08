const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  mpesaNumber: String,
  status: { type: String, default: "Pendente" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
