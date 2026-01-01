const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, async (req, res) => {
  res.json({
    name: "Imídio",
    email: "imidiomacave07@gmail.com",
    balance: 0
  });
});

module.exports = router;
