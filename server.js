const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// ROTA RAIZ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Opcional: rota fallback para arquivos não encontrados
app.get('*', (req, res) => {
  res.status(404).send('Página não encontrada');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
