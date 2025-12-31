const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📌 SERVIR HTML
app.use(express.static("public"));

// 📌 ROTAS API
app.use("/api/auth", authRoutes);

// 📌 TESTE DE STATUS
app.get("/api/status", (req, res) => {
  res.json({ status: "Macave Mining API está rodando 🚀" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta", PORT);
});
