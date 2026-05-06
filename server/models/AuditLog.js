const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  type: String,
  userId: String,
  amount: Number,
  balanceAfter: Number,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditSchema);
