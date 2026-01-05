const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { processCryptoWithdrawal } = require("../controllers/cryptoPaymentController");

// Processar saque em cripto
router.post("/send", auth, processCryptoWithdrawal);

module.exports = router;
