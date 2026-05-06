const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ======================
// 🔐 MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// 📡 DATABASE
// ======================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crypto", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.log("❌ Erro DB:", err));

// ======================
// 📁 ROTAS
// ======================
app.use("/api/auth", require("./server/routes/auth"));
app.use("/api/admin", require("./server/routes/admin"));
app.use("/api/deposit", require("./server/routes/deposit"));
app.use("/api/withdraw", require("./server/routes/withdraw"));
app.use("/api/mining", require("./server/routes/mining"));
app.use("/api/stats", require("./server/routes/stats"));
app.use("/api/2fa", require("./server/routes/twofa"));
app.use("/api/ai", require("./server/routes/ai"));

// ======================
// 🧾 LOG GLOBAL
// ======================
app.use((req, res, next) => {
  console.log(`📌 ${req.method} ${req.url}`);
  next();
});

// ======================
// ❌ ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// ======================
// 🚀 START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
