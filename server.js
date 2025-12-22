require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/connect');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Rota teste
app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
