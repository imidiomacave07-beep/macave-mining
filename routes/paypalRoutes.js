const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");

router.post("/create-order", paypalController.createOrder);
router.post("/capture-order", paypalController.captureOrder);

module.exports = router;
