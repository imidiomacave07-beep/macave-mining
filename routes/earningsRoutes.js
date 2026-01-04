const express = require("express");
const { calculateEarnings } = require("../controllers/earningsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/earnings", authMiddleware, calculateEarnings);

module.exports = router;
