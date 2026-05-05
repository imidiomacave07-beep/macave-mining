const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ======================
// 🔐 MIDDLEWARE GLOBAL
// ======================
app.use(cors());
app.use(express.json());

// ======================
// 📡 DATABASE
// ======================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crypto", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Erro DB:", err));

// ======================
// 🧠 ROTAS PRINCIPAIS
// ======================

// 🔐 AUTH (login, JWT)
app.use("/api/auth", require("./routes/auth"));

// 👤 ADMIN (controlo do sistema)
app.use("/api/admin", require("./routes/admin"));

// 💰 DEPÓSITOS (USDT / BTC)
app.use("/api/deposit", require("./routes/deposit"));

// 💸 SAQUES
app.use("/api/withdraw", require("./routes/withdraw"));

// 📊 ESTATÍSTICAS / DASHBOARD
app.use("/api/stats", require("./routes/stats"));

// ⚡ MINERAÇÃO (HASHRATE REAL)
app.use("/api/mining", require("./routes/mining"));

// 🔐 2FA (Google Authenticator)
app.use("/api/2fa", require("./routes/twofa"));

// ======================
// 🧠 AI & INTELIGÊNCIA
// ======================

// previsão de lucro
app.use("/api/ai", require("./routes/ai"));

// antifraude
const fraudEngine = require("./services/fraudEngine");

// ======================
// 🔔 PUSH NOTIFICATIONS
// ======================
app.use("/api/notifications", require("./services/pushNotifications"));

// ======================
// 🧾 AUDITORIA GLOBAL
// ======================
const auditLogger = require("./services/auditLogger");

// exemplo global middleware de auditoria
app.use(async (req, res, next) => {
  console.log("📌 Request:", req.method, req.url);
  next();
});

// ======================
// 🛡️ ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// ======================
// 🚀 START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
