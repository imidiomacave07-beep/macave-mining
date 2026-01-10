require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./backend/auth.routes"); // << caminho correto

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API rodando na porta " + (process.env.PORT || 10000));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${PORT}`);
});
