const express = require("express");
const router = express.Router();

// Para teste inicial
router.post("/register", (req, res) => {
  res.json({ success: true, message: "Usuário registrado (simulação)" });
});

router.post("/login", (req, res) => {
  res.json({ success: true, message: "Login realizado (simulação)" });
});

module.exports = router;
