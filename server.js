const express = require("express");
require("dotenv").config();
require("./config/connect"); // conecta ao MongoDB

const authRoutes = require("./routes/authRoutes");
const miningRoutes = require("./routes/miningRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/mining", miningRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
