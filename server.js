const express = require('express');
const path = require('path');
require('dotenv').config();
require('./connect');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/test-register.html'));
});

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
