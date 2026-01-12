const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require("./backend/auth.routes");
const plansRoutes = require("./backend/plans.routes");
const withdrawRoutes = require("./backend/withdraw.routes");

app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/withdraw", withdrawRoutes);

// Test route
app.get("/", (req, res) => res.send("🚀 Macave Mining API rodando"));

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Macave Mining API rodando na porta ${PORT}`));
