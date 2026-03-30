const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

const plansRoutes = require('./routes/plans.routes');
const referralRoutes = require('./routes/referral.routes');

app.use('/api/plans', plansRoutes);
app.use('/api/referral', referralRoutes);

require('./cron');

app.listen(port, '0.0.0.0', () => {
  console.log(`Macave Mining API rodando na porta ${port}`);
});
