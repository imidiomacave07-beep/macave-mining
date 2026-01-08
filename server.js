const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./backend/auth");
const withdrawRoutes = require("./backend/withdraw");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/withdraw", withdrawRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API rodando");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
