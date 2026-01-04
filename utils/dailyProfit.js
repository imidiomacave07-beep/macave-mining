const Plan = require("../models/Plan");
const User = require("../models/User");

async function distributeDailyProfits() {
  try {
    const plans = await Plan.find({ active: true });

    for (const plan of plans) {
      const user = await User.findById(plan.userId);
      if (!user) continue;

      // calcula dias desde início
      const daysElapsed = Math.floor((Date.now() - plan.startDate) / (1000 * 60 * 60 * 24));
      if (daysElapsed >= plan.durationDays) {
        plan.active = false;
        await plan.save();
        continue;
      }

      // adiciona lucro diário
      user.balance += plan.dailyProfit;
      await user.save();
    }

    console.log("Ganhos diários distribuídos com sucesso!");
  } catch (err) {
    console.error("Erro ao distribuir lucros diários:", err);
  }
}

module.exports = distributeDailyProfits;
