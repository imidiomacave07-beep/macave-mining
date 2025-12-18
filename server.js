const express = require('express');
const path = require('path');
const app = express();

// middleware
app.use(express.json());

// 👉 SERVIR ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// 👉 ROTA PRINCIPAL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
