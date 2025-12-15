const express = require('express');
const path = require('path');

const app = express();

// Servir ficheiros estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test-login.html'));
});

// Porta
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log('Servidor online na porta ' + PORT);
});
