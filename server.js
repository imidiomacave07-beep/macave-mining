require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const { getDailyMiningIncome } = require("./binancePool");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

/* DISTRIBUIÇÃO REAL */
app.post("/api/mining/distribute", async (req, res) => {
  const income = await getDailyMiningIncome();

  if (!income.length)
    return res.json({ message: "Nenhum lucro hoje" });

  const totalBTC = income.reduce(
    (sum, i) => sum + Number(i.profitAmount),
    0
  );

  const users = await User.find({ "plans.0": { $exists: true } });

  let totalShare = 0;
  users.forEach(u =>
    u.plans.forEach(p => (totalShare += p.profitShare))
  );

  for (const user of users) {
    let userShare = 0;
    user.plans.forEach(p => (userShare += p.profitShare));

    const userProfit = (userShare / totalShare) * totalBTC;
    user.balance += userProfit;
    await user.save();
  }

  res.json({ message: "Lucro distribuído", totalBTC });
});

app.listen(3000, () =>
  console.log("🚀 Macave Mining + Binance Pool conectado")
);
