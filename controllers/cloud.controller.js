const cloudConfig = require('../config/cloud.config');
const axios = require('axios');

let userBalances = {}; // { userId: { invested, profit } }

async function getCloudBalance() {
  // Simulação: aqui você conecta a API real do serviço de cloud mining
  return 0.1;
}

async function distributeProfits() {
  const balance = await getCloudBalance();
  const totalInvested = Object.values(userBalances).reduce((a,b)=>a+b.invested,0);
  if(totalInvested === 0) return;

  for(const userId in userBalances){
    const share = userBalances[userId].invested / totalInvested;
    const profit = balance * share;
    userBalances[userId].profit = (userBalances[userId].profit || 0) + profit;
  }
  console.log('Lucros distribuídos aos usuários!');
}

module.exports = { userBalances, distributeProfits };
