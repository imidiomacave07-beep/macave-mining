const miningService = require("./services/mining.service");

setInterval(async () => {
  const balance = await miningService.getBalance();
  console.log("Lucro diário atualizado:", balance);
}, 24 * 60 * 60 * 1000); // 24 horas
