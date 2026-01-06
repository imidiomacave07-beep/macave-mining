// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Importar rotas
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("Macave Mining API está online 🚀");
});

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
