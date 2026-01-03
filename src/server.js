const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// servir ficheiros públicos
app.use(express.static(path.join(__dirname, "../public")));

// rotas
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// rota dashboard protegida
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// iniciar servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
