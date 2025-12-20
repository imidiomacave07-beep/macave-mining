// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/connect'); // conecta ao MongoDB
const authRoutes = require('./routes/authRoutes'); // registro/login
const mineRoutes = require('./routes/mineRoutes'); // mineração
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
connectDB();

// Rota de teste para verificar se API está rodando
app.get('/test', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/mine', mineRoutes);

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
