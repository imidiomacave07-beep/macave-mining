const express = require("express")
const router = express.Router()
const walletController = require("../controllers/wallet.controller")
const auth = require("../middleware/auth")

router.post("/deposit", auth, walletController.deposit)
module.exports = router
