const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// rotas API
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// fallback
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta " + PORT);
});
