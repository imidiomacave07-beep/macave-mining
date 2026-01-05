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
  status: {
    type: String,
    enum: ["pending", "completed", "rejected"],
    default: "pending"
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
