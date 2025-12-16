const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ mining: "simulada", status: "ativa" });
});

module.exports = router;
