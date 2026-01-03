const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserPlan = require("../models/UserPlan");
const Plan = require("../models/Plan");
const auth = require("../middleware/authMiddleware");

// Dashboard (calcula ganhos aqui)
router.get("/dashboard", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const userPlan = await UserPlan.findOne({ userId: user._id });

  if (userPlan) {
    const plan = await Plan.findById(userPlan.planId);
    const now = new Date();
    const diffDays = Math.floor(
      (now - userPlan.lastClaim) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 0) {
      const profit = diffDays * plan.dailyProfit;
      user.balance += profit;
      userPlan.lastClaim = now;
      await user.save();
      await userPlan.save();
    }
  }

  res.json({
    username: user.username,
    balance: user.balance
  });
});

module.exports = router;
