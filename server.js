const express = require("express");
const path = require("path");
require("dotenv").config();
require("./connect"); // Conexão com MongoDB

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/test-register.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}`);
});
