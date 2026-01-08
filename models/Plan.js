const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  dailyProfit: Number,
  duration: Number
});

module.exports = mongoose.model("Plan", PlanSchema);
