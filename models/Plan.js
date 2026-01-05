const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: Number,       // valor investido
  dailyRate: Number,    // percentagem diária (ex: 0.03 = 3%)
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Plan", PlanSchema);
