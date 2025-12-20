const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect');

const authRoutes = require('./routes/authRoutes');
const miningRoutes = require('./routes/miningRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ status: 'Macave Mining API está rodando 🚀' });
});

app.use('/api/auth', authRoutes);
app.use('/api', miningRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
