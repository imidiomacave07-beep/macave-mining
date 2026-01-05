const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { requestWithdrawal, getWithdrawals } = require("../controllers/withdrawalController");

// Solicitar saque
router.post("/request", auth, requestWithdrawal);

// Listar saques do usuário
router.get("/", auth, getWithdrawals);

module.exports = router;
