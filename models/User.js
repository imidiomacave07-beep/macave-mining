const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 100 },
  isAdmin: { type: Boolean, default: false },
  wallet: { type: String, default: "" },
  plans: [
    {
      id: Number,
      name: String,
      profit: Number,
      wallet: String
    }
  ],
  withdraws: [
    {
      amount: Number,
      method: String,
      destination: String,
      date: String,
      status: String
    }
  ]
});

module.exports = model("User", userSchema);
