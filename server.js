require("dotenv").config();
const express = require("express");
const cors = require("cors");

// IMPORTAÇÃO CORRETA DAS ROTAS
// Caminho relativo seguro assumindo que backend está em /src/backend
const authRoutes = require("./backend/auth.routes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROTAS
app.use("/api/auth", authRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API rodando na porta " + (process.env.PORT || 10000));
});

// INICIA SERVIDOR
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${PORT}`);
});
