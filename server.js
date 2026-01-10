const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend (public)
app.use(express.static(path.join(__dirname, "public")));

// Rotas backend
const authRoutes = require("./backend/auth.routes");
app.use("/api/auth", authRoutes);

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${PORT}`);
});
