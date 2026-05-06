const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: String,
  type: String, // deposit | withdraw
  amount: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
