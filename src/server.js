const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// middlewares
app.use(express.json());

// rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// servir ficheiros públicos
app.use(express.static(path.join(__dirname, "../public")));

// rota dashboard protegida (exemplo simples)
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conectado com sucesso!");
    app.listen(process.env.PORT || 10000, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT || 10000}`)
    );
  })
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));
