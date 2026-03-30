const mongoose = require("mongoose")

const PlanSchema = new mongoose.Schema({
  name:String,
  dailyROI:Number,
  term:Number,
  minDeposit:Number,
  maxDeposit:Number
})

module.exports = mongoose.model("Plan", PlanSchema)
