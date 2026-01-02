const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES GLOBAIS
======================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   FICHEIROS PÚBLICOS
======================= */
app.use(express.static(path.join(__dirname, "public")));

/* =======================
   ROTAS
======================= */
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

/* =======================
   DASHBOARD
======================= */
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

/* =======================
   ROTA RAIZ
======================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =======================
   CONEXÃO MONGODB
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
  })
  .catch((err) => {
    console.error("❌ Erro MongoDB:", err);
  });

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
