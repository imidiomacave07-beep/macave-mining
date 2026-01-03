const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// permitir JSON
app.use(express.json());

// servir ficheiros públicos
app.use(express.static(path.join(__dirname, "public")));

// rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// rota login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// rota dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// fallback
app.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

app.listen(PORT, () => {
  console.log("🚀 Macave Mining rodando na porta", PORT);
});
