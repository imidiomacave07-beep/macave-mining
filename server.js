// server.js

// Importa dependências
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/connect'); // <- Import corrigido

// Inicializa app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conecta ao MongoDB
connectDB();

// Rotas (exemplo)
app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

// Inicia servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
