const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  profitShare: Number // % de participação
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 0 },
  plans: [planSchema],
  isAdmin: Boolean
});

module.exports = mongoose.model("User", userSchema);
