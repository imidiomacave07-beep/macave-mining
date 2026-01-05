const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: "user" // user | admin
  }
});

module.exports = mongoose.model("User", UserSchema);
