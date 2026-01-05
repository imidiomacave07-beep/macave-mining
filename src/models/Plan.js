const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: String,
  dailyProfit: Number
});

module.exports = mongoose.model("Plan", PlanSchema);
