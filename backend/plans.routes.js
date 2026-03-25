const express = require("express");
const router = express.Router();

const plans = [
  { name: "Starter", price: 5, profit: "0.5% – 1% / dia" },
  { name: "Basic", price: 20, profit: "1% – 2% / dia" },
  { name: "Pro", price: 50, profit: "2% – 3% / dia" },
  { name: "Advanced", price: 100, profit: "3% – 5% / dia" }
];

router.get("/", (req, res) => {
  res.json(plans);
});

module.exports = router;
