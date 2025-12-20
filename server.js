require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.json({ status: 'Macave Mining API está rodando 🚀' }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
