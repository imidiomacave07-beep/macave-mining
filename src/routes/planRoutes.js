const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const UserPlan = require("../models/UserPlan");
const auth = require("../middleware/authMiddleware");

router.post("/buy/:planId", auth, async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  if (!plan) return res.status(404).json({ msg: "Plano não encontrado" });

  await UserPlan.create({
    userId: req.user.id,
    planId: plan._id
  });

  res.json({ msg: "Plano comprado com sucesso" });
});

module.exports = router;
