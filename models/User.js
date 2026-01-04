const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  plan: String,
  balance: {
    type: Number,
    default: 0
  },
  lastEarning: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
