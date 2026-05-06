const mongoose = require("mongoose");

const miningSchema = new mongoose.Schema({
  userId: String,
  hashrate: Number,
  earnings: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MiningData", miningSchema);
