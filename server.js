const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ========================
   MIDDLEWARES
======================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================
   ROTAS
======================== */
const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

/* rotas públicas */
app.use("/api/auth", authRoutes);

/* rotas protegidas */
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);

/* rota raiz (para evitar Cannot GET /) */
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API está online");
});

/* ========================
   MONGODB
======================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch((err) => {
    console.error("Erro ao conectar MongoDB:", err);
  });

/* ========================
   SERVER
======================== */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
