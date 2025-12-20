const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect');
require('dotenv').config();

const app = express();

// Conectar MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz (IMPORTANTE)
app.get('/', (req, res) => {
  res.send('🚀 Macave Mining API está rodando');
});

// Rotas
app.use('/api/users', require('./routes/userRoutes'));

// Porta
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
