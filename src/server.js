const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB conectado!"))
.catch(err => console.error("Erro ao conectar MongoDB:", err));

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "../public/dashboard.html")));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
