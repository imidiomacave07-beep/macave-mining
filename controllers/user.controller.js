const User = require("../models/User")

exports.getMe = async (req,res)=>{
  try{
    const user = await User.findById(req.userId)
    if(!user) return res.status(404).json({message:"Usuário não encontrado"})
    res.json(user)
  }catch(err){ res.status(500).json({message:"Erro"}) }
}
