const { distributeProfits } = require('./controllers/cloud.controller');

setInterval(async () => {
  console.log('Distribuindo lucros...');
  await distributeProfits();
}, 60 * 60 * 1000); // a cada 1 hora
