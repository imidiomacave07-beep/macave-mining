const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// 🔹 ROTA DE TESTE (IMPORTANTE)
app.get('/', (req, res) => {
  res.send('🚀 Macave Mining API está online');
});

app.get('/api', (req, res) => {
  res.json({ status: 'API funcionando corretamente' });
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

// Porta
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
