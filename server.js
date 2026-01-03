// src/server.js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// servir ficheiros públicos
app.use(express.static(path.join(__dirname, "../public")));

// rota dashboard protegida
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
