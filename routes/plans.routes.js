const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middleware/auth")

const REF_COMMISSION = 0.05

router.post("/buy", auth, async (req,res)=>{
  const { planName, amount } = req.body
  const user = await User.findById(req.userId)
  if(user.balance < amount) return res.status(400).json({message:"Saldo insuficiente"})

  user.balance -= amount
  user.invested += amount
  await user.save()

  if(user.referral){
    const refUser = await User.findOne({ referralCode:user.referral })
    if(refUser){
      const commission = amount * REF_COMMISSION
      refUser.balance += commission
      refUser.referralCommission += commission
      await refUser.save()
    }
  }

  res.json({ balance:user.balance })
})

module.exports = router
