const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');
const withdrawRoutes = require('./withdraw');
const profitCalculator = require('./profitCalculator');
const logActivity = require('./logger');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/withdraw', withdrawRoutes);
app.use(express.static('../public'));

app.listen(PORT, () => logActivity(`Servidor rodando na porta ${PORT}`));
