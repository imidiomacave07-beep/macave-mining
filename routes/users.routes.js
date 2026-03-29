const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()
const users = []

router.post("/register", async (req, res) => {
  const { username, password, ref } = req.body

  const hash = await bcrypt.hash(password, 10)

  users.push({
    username,
    password: hash,
    referral: ref || null,  // salva quem convidou
    wallet: { balance: 0, plans: [] }
  })

  res.json({
    message: "registered",
    referralLink: `/register?ref=${username}`
  })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)
  if (!user) return res.json({ message: "user not found" })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.json({ message: "wrong password" })
  const token = jwt.sign({ username }, "secret")
  res.json({ token })
})

module.exports = router
module.exports.users = users
