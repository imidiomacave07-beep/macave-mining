const express = require("express");
const router = express.Router();

// ✅ caminho CORRETO (middleware, singular)
const authMiddleware = require("../middleware/authMiddleware");

// rota protegida
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    name: "Usuário Macave",
    email: "imidiomacave07@gmail.com",
    balance: 0
  });
});

module.exports = router;
