const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  wallet: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "pending" // pending, approved, rejected
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
