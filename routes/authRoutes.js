const express = require("express");
const router = express.Router();

// rota de teste
router.get("/", (req, res) => {
  res.json({ message: "Auth API OK" });
});

module.exports = router;
