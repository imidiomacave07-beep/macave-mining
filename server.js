const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// rotas API
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
