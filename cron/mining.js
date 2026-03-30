const User = require("../models/User")

setInterval(async ()=>{
  const users = await User.find()
  for(const user of users){
    if(user.invested > 0){
      const dailyProfit = user.invested * 0.015
      user.balance += dailyProfit
      await user.save()
    }
  }
  console.log("Lucros diários atualizados")
}, 1000*60*60*24)
