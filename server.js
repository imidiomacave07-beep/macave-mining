require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // para arquivos HTML, CSS, JS

// Rotas
app.use('/api/auth', authRoutes);

// Porta
const PORT = process.env.PORT || 10000;

// Conectar MongoDB e iniciar servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado com sucesso');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('Erro ao conectar MongoDB:', err));
