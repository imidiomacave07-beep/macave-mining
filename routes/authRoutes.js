const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  // login fake (por enquanto)
  const token = jwt.sign(
    { id: 1 },
    process.env.JWT_SECRET || "macave_secret",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
