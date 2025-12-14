Perfeito! Vamos criar o backend completo para a mineração simulada, corrigindo todos os erros do deploy (bcrypt, dotenv, rotas ausentes) e preparando para uso no Render.


---

1️⃣ Estrutura do backend

Vamos criar os arquivos essenciais:

macave-mining/
│
├─ routes/
│  ├─ authRoutes.js        # login e registro
│  └─ miningRoutes.js      # mineração simulada
│
├─ controllers/
│  ├─ userController.js
│  └─ miningController.js
│
├─ User.js                 # modelo de usuário
├─ server.js               # app principal
├─ package.json
└─ .env                    # MongoDB URI


---

2️⃣ Código dos arquivos

2.1 User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },          // pontos minerados
  miningRate: { type: Number, default: 1 },     // pontos por minuto
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);


---

2.2 server.js

const express = require('express');
const path = require('path');
require('dotenv').config();
require('./connect'); // conexão MongoDB

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// rotas
const authRoutes = require('./routes/authRoutes');
const miningRoutes = require('./routes/miningRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/mining', miningRoutes);

// rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/test-register.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}`);
});


---

2.3 routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../User');

// Registro
router.post('/register', async (req, res) => {
  const { username, password }
