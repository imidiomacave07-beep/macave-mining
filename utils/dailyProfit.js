const Plan = require("../models/Plan");
const User = require("../models/User");

module.exports = async function distributeDailyProfits() {
  const plans = await Plan.find({ active: true });

  for (const plan of plans) {
    const profit = plan.amount * plan.dailyRate;

    await User.findByIdAndUpdate(plan.userId, {
      $inc: { balance: profit }
    });
  }

  console.log("Lucros diários distribuídos");
};
