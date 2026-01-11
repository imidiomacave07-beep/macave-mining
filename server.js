const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rotas
const authRoutes = require("./backend/auth.routes");
const plansRoutes = require("./backend/plans.routes");
const withdrawRoutes = require("./backend/withdraw.routes");

app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/withdraw", withdrawRoutes);

app.listen(PORT, () => console.log(`🚀 Macave Mining API rodando na porta ${PORT}`));
