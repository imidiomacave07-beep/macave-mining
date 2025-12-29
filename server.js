const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   SERVIR FRONTEND (HTML)
========================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   ROTAS API
========================= */
app.get("/api/status", (req, res) => {
  res.json({ status: "Macave Mining API está rodando 🚀" });
});

/* =========================
   FALLBACK (SPA / LINKS)
========================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   CONEXÃO DB + SERVER
========================= */
const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/macave", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Erro MongoDB:", err));
