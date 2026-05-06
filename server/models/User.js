const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 0 },

  depositStatus: {
    type: String,
    enum: ["ACTIVE", "SUSPENDED", "BLOCKED"],
    default: "ACTIVE"
  },

  failedLogins: { type: Number, default: 0 },
  multipleIPs: { type: Boolean, default: false },
  withdrawImmediatelyAfterDeposit: { type: Boolean, default: false },
  unusualAmountPattern: { type: Boolean, default: false },

  actionsPerMinute: { type: Number, default: 0 },
  multipleAccountsIP: { type: Boolean, default: false },
  depositPattern: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
