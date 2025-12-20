const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
require('./config/connect');

const app = express();

app.use(cors());
app.use(express.json());

// arquivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// rotas API
app.use('/api/users', require('./routes/userRoutes'));

// rota teste
app.get('/api', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
