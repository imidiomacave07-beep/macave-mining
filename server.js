// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/connect');

// Carregar variáveis do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Teste da API
app.get('/', (req, res) => {
  res.send('Macave Mining API funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
