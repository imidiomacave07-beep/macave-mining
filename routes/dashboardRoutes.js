const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-__v");

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(user);
});

module.exports = router;
