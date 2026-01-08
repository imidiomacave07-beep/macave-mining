const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./backend/auth");
const withdrawRoutes = require("./backend/withdraw");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/withdraw", withdrawRoutes);

// Servir frontend
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
