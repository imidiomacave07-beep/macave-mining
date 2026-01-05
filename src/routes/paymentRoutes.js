const express = require("express");
const router = express.Router();
const { payWithCrypto } = require("../controllers/paymentController");

router.post("/crypto", payWithCrypto);

module.exports = router;
