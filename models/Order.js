const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },

  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  commission: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "cancelled"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
