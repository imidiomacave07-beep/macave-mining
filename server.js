const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 🔥 CORRETO
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./backend/auth.routes'));
app.use('/api/plans', require('./backend/plans.routes'));
app.use('/api/wallet', require('./backend/wallet.routes'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Servidor rodando...');
});
