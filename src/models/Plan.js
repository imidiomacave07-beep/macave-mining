const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },        // preço em USD
  dailyProfit: { type: Number, required: true },  // lucro diário em %
  durationDays: { type: Number, required: true }, // duração do plano
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Plan", planSchema);
