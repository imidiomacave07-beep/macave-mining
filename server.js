const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ================= CONEXÃO MONGODB =================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/macave", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB conectado");
}).catch(err => {
  console.log("Erro MongoDB:", err);
});

// ================= MODELS (opcional import central) =================
const User = require("./models/User");

// ================= ROTAS USUÁRIO =================
const profileRoutes = require("./routes/profile");
const withdrawRoutes = require("./routes/withdraw");
const depositRoutes = require("./routes/deposit");

app.use("/profile", profileRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/deposit", depositRoutes);

// ================= ROTAS ADMIN =================
const adminWithdrawRoutes = require("./routes/adminWithdraw");
const adminDepositRoutes = require("./routes/adminDeposit");

app.use("/admin", adminWithdrawRoutes);
app.use("/admin", adminDepositRoutes);

// ================= ROTA BASE =================
app.get("/", (req, res) => {
  res.send("Macave Mining API está a funcionar 🚀");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
