const express = require("express");
const router = express.Router();
const depositController = require("../controllers/depositController");

router.get("/wallets", depositController.getDepositWallets);

module.exports = router;
