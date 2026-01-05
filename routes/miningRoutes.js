const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { buyPlan } = require("../controllers/miningController");

router.post("/buy", auth, buyPlan);

module.exports = router;
