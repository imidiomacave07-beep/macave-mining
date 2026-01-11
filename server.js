const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ROTAS
const plansRoutes = require("./backend/plans.routes");
const authRoutes = require("./backend/auth.routes");

app.use("/api/plans", plansRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API rodando");
});

app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta " + PORT);
});
