const express = require("express");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

// ficheiros públicos
app.use(express.static(path.join(__dirname, "public")));

// rotas
app.use("/api/auth", require("./routes/authRoutes"));

// dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("🚀 Servidor rodando na porta", PORT)
);
