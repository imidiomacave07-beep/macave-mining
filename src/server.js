const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/connect');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar MongoDB
connectDB();

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

// Rotas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
