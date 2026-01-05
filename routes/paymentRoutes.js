const express = require("express");
const router = express.Router();

router.get("/crypto", (req, res) => {
  res.json({
    method: "crypto",
    status: "ativo"
  });
});

module.exports = router;
