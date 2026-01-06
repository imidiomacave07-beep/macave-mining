const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "public")));

// rotas da API
app.use("/api/auth", authRoutes);

// rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(PORT, () => {
      console.log("Servidor rodando na porta " + PORT);
    });
  })
  .catch(err => console.error(err));
