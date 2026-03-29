const express = require("express")
const router = express.Router()

// Planos de $10 a $5000
const planos = [
  { id: 1, name: "Starter", roi: 1, days: 20, min: 10, max: 99 },
  { id: 2, name: "Basic", roi: 1.5, days: 30, min: 100, max: 499 },
  { id: 3, name: "Standard", roi: 2, days: 30, min: 500, max: 999 },
  { id: 4, name: "Advanced", roi: 2.5, days: 45, min: 1000, max: 2999 },
  { id: 5, name: "VIP", roi: 3, days: 60, min: 3000, max: 5000 }
]

router.get("/", (req, res) => {
  res.json(planos)
})

module.exports = router
module.exports.planos = planos
