const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test-register.html"));
});

// Rotas API
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}`);
});
