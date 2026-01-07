const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  dailyProfit: { type: Number, required: true }, // %
  duration: { type: Number, required: true }, // dias
});

module.exports = mongoose.model("Plan", planSchema);
