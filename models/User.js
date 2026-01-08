const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  amount: Number,
  method: String,
  destination: String,
  date: String,
  status: { type: String, default: "pendente" }
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  withdraws: [withdrawSchema]
});

module.exports = mongoose.model("User", userSchema);
