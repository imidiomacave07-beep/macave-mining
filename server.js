const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./connect');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar MongoDB
connectDB();

// Rotas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rota teste
app.get('/', (req, res) => {
  res.send('Macave Mining API está rodando');
});

// Porta
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
