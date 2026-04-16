const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  network: {
    type: String,
    default: "TRC20"
  },

  status: {
    type: String,
    default: "pending" // pending, confirmed, rejected
  },

  txHash: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Deposit", DepositSchema);
