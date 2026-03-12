const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rotas
const authRoutes = require("./backend/auth.routes");
const plansRoutes = require("./backend/plans.routes");
app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);

// Rota teste
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${port}`);
});
