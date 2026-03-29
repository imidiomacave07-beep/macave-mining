const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const plansRoutes = require('./routes/plans.routes');
const usersRoutes = require('./routes/users.routes');
const walletRoutes = require('./routes/wallet.routes');

app.use('/api/plans', plansRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/wallet', walletRoutes);

// Ping para manter ativo
app.get('/ping', (req, res) => res.send('Pong 🟢'));

// Raiz
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`Macave Mining rodando na porta ${PORT}`));
