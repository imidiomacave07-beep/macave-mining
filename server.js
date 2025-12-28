require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.get('/api/status', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
