const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "teste@macave.com",
    balance: 0
  });
});

module.exports = router;
