const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboardController");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Sem token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
};

router.get("/", authMiddleware, getDashboard);

module.exports = router;
