// server.js
const express = require('express');
const cors = require('cors'); // 🔹 Importa o CORS
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/connect'); // Conexão com MongoDB
const routes = require('./routes'); // Suas rotas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// 🔹 Configuração CORS
app.use(cors({
    origin: '*', // Permite acesso de qualquer domínio (desenvolvimento)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);

// Conecta ao MongoDB
connectDB();

// Rota padrão para testar se o servidor está ativo
app.get('/', (req, res) => {
    res.send('Servidor Macave Mining rodando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
