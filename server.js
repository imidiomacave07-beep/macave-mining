const express = require("express");
const mongoose = require("mongoose");
const distributeDailyProfits = require("./utils/dailyProfit");

require("dotenv").config();

const app = express();
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error("Erro MongoDB:", err));

// Rotas...
// app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// ===== CRON JOB =====
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 horas

setInterval(() => {
  distributeDailyProfits();
}, ONE_DAY);
