const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/support", contactController.getSupportInfo);

module.exports = router;
