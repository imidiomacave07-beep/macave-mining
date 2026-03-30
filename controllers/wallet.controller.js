const User = require("../models/User")

exports.deposit = async (req,res)=>{
  try{
    const { amount } = req.body
    const user = await User.findById(req.userId)
    if(!user) return res.status(404).json({message:"Usuário não encontrado"})
    user.balance += amount
    await user.save()
    res.json({ balance:user.balance })
  }catch(err){ res.status(500).json({message:"Erro depósito"}) }
}
