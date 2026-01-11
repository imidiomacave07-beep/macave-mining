const express = require("express");
const router = express.Router();

let plans = [
  {
    id: 1,
    name: "Starter",
    price: 20,
    dailyMin: 1.2,
    dailyMax: 1.8,
    duration: 30
  },
  {
    id: 2,
    name: "Basic",
    price: 50,
    dailyMin: 1.5,
    dailyMax: 2.2,
    duration: 30
  },
  {
    id: 3,
    name: "Pro",
    price: 100,
    dailyMin: 2.0,
    dailyMax: 2.8,
    duration: 30
  },
  {
    id: 4,
    name: "Advanced",
    price: 200,
    dailyMin: 2.5,
    dailyMax: 3.5,
    duration: 30
  }
];

// listar planos
router.get("/", (req, res) => {
  res.json(plans);
});

module.exports = router;
