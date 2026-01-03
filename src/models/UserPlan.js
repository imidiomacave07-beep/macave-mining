const mongoose = require("mongoose");

const UserPlanSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  planId: mongoose.Schema.Types.ObjectId,
  lastClaim: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserPlan", UserPlanSchema);
