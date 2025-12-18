const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/connect');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
