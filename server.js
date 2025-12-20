const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/connect');
const userRoutes = require('./src/routes/userRoutes');

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Rotas
app.use('/api/users', userRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

// Porta
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
