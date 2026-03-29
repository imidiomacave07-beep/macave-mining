const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()
const users = require("./users.routes").users
const planos = require("./plans.routes").planos

// Carteira da plataforma para comissão do dono
const platformWallet = { balance: 0 }

function auth(req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).send("Unauthorized")
  const data = jwt.verify(token, "secret")
  req.user = users.find(u => u.username === data.username)
  next()
}

// Depósito + comissão da plataforma e do referral
router.post("/deposit", auth, (req, res) => {
  const { amount } = req.body
  const fee = amount * 0.05 // 5% para plataforma
  const userAmount = amount - fee
  req.user.wallet.balance += userAmount
  platformWallet.balance += fee

  // Comissão para referral
  const refUser = users.find(u => u.username === req.user.referral)
  if (refUser) {
    const bonus = amount * 0.05
    refUser.wallet.balance += bonus
  }

  res.json({
    balance: req.user.wallet.balance,
    platformProfit: platformWallet.balance
  })
})

// Comprar planos
router.post("/buy-plan", auth, (req, res) => {
  const { planId, amount } = req.body
  const plan = planos.find(p => p.id === planId)
  if (!plan) return res.json({ message: "plan not found" })
  if (req.user.wallet.balance < amount) return res.json({ message: "no balance" })
  req.user.wallet.balance -= amount
  req.user.wallet.plans.push({
    planId,
    amount,
    start: new Date(),
    roi: plan.roi
  })
  // 2% da compra para plataforma
  platformWallet.balance += amount * 0.02
  res.json({ message: "plan purchased", platformProfit: platformWallet.balance })
})

// Ver carteira + lucro diário
router.get("/", auth, (req, res) => {
  req.user.wallet.plans.forEach(plan => {
    const days = Math.floor((new Date() - new Date(plan.start)) / 86400000)
    plan.profit = days * (plan.amount * (plan.roi / 100))
  })
  res.json(req.user.wallet)
})

module.exports = router
