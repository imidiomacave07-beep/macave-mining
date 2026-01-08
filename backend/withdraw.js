const express = require("express");
const router = express.Router();

router.get("/history", (req, res) => {
  res.json([]);
});

router.post("/request", (req, res) => {
  res.json({ message: "Saque simulado recebido" });
});

module.exports = router;
