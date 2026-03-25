const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Importar rotas
const plansRoutes = require('./backend/plans.routes');
const authRoutes = require('./backend/auth.routes'); // se já existir
const withdrawRoutes = require('./backend/withdraw.routes'); // se já existir

app.use('/api/plans', plansRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/withdraw', withdrawRoutes);

// Servir frontend
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
