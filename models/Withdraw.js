const mongoose = require("mongoose");

const WithdrawSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  crypto: {
    type: String,
    required: true
  },
  wallet: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pendente"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Withdraw", WithdrawSchema);
