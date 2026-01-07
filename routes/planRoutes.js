const express = require("express");
const Plan = require("../models/Plan");
const router = express.Router();

router.get("/", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

module.exports = router;
