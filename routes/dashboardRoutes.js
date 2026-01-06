// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboardController");

// rota GET para dashboard
router.get("/", getDashboard);

module.exports = router;
