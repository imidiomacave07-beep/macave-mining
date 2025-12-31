require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connect");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Status
app.get("/api/status", (req, res) => res.json({ status: "Macave Mining API está rodando 🚀" }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
