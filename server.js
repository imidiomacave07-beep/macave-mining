const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
require("./database/connect");

const authRoutes = require("./routes/authRoutes");
const miningRoutes = require("./routes/miningRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/mining", miningRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
