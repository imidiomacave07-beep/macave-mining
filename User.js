const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  miningActive: { type: Boolean, default: false },
  miningStart: { type: Date, default: null }
});

module.exports = mongoose.model("User", UserSchema);
