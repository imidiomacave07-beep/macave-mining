const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// ROTAS
// =========================
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rota simples para teste
app.get('/api/status', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

// =========================
// MONGODB CONNECTION
// =========================
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB conectado com sucesso'))
  .catch((err) => console.log('❌ Erro ao conectar MongoDB:', err));

// =========================
// SERVIDOR
// =========================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
