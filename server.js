require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// servir arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// rotas
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// dashboard protegido
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta", PORT);
});
