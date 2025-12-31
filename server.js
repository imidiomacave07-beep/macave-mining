require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
