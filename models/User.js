const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  profit: Number,
  date: String
});

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
  plans: [planSchema],
  withdraws: [withdrawSchema]
});

module.exports = mongoose.model("User", userSchema);
