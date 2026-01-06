const User = require("../models/User");

module.exports = async function distributeDailyProfits() {
  const users = await User.find();
  users.forEach(async (user) => {
    user.saldo += 1; // exemplo: adicionar 1 USD por dia
    await user.save();
  });
  console.log("Lucros diários distribuídos!");
};
