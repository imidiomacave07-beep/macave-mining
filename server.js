const runDailyMining = require("./utils/dailyMining");

// 1 dia em milissegundos
const ONE_DAY = 24 * 60 * 60 * 1000;

// roda automaticamente todo dia
setInterval(() => {
  runDailyMining();
}, ONE_DAY);
