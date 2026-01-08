const users = [];
const logActivity = require('./logger');

function calculateProfits() {
  users.forEach(user => {
    const profit = 0.01; // lucro fixo simples
    user.balance = (user.balance || 0) + profit;
    logActivity(`Lucro atualizado para ${user.email}: ${user.balance.toFixed(2)}`);
  });
}

setInterval(calculateProfits, 60000);

module.exports = calculateProfits;
