const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 ISTO É O QUE RESOLVE O "Cannot GET"
app.use(express.static(path.join(__dirname, 'public')));

// rota raiz
app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
