const express = require('express');
const path = require('path');
const connectDB = require('./config/connect');

const app = express();
connectDB();

app.use(express.json());

// 👉 SERVIR FRONTEND
app.use(express.static(path.join(__dirname, 'public')));

// 👉 ROTA RAIZ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 👉 ROTAS API
app.use('/api', require('./routes'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
