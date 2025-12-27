const express = require('express');
const path = require('path');

const app = express();

// 🔴 ESTA LINHA É O QUE ESTÁ FALTANDO
app.use(express.static(path.join(__dirname, 'public')));

// rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
