require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 10000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// rota teste
app.get("/", (req, res) => {
  res.send("Macave Mining API está online 🚀");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(PORT, () =>
      console.log(`Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Erro ao conectar MongoDB:", err);
  });
