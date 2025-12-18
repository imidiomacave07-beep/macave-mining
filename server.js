require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* =====================
   Middlewares
===================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   MongoDB Connection
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((err) => console.error("❌ Erro ao conectar MongoDB:", err));

/* =====================
   Arquivos públicos
===================== */
app.use(express.static(path.join(__dirname, "public")));

/* =====================
   Rotas básicas
===================== */
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API está rodando");
});

/* =====================
   Porta
===================== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
