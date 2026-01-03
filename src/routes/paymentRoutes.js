const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/crypto", authMiddleware, (req, res) => {
  const { amount, plan } = req.body;

  res.json({
    success: true,
    message: "Pagamento enviado para verificação",
    plan,
    amount,
    status: "pending"
  });
});

module.exports = router;
