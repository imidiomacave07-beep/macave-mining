const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

// SERVIR ARQUIVOS HTML
app.use(express.static(path.join(__dirname, 'public')));

// ROTAS API
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
