const express = require("express");
const { payWithCrypto } = require("../controllers/paymentController");

const router = express.Router();

router.post("/crypto", payWithCrypto);

module.exports = router;
