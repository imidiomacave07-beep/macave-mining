const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    status: "ok",
    message: "Autenticação funcionando"
  });
});

module.exports = router;
