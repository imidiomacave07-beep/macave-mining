require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect');

const app = express();

// Conectar MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', require('./routes/userRoutes'));

// Rota teste
app.get('/', (req, res) => {
  res.send('Macave Mining API está rodando');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
