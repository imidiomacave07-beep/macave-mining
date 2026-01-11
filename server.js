const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ROTAS
const plansRoutes = require("./backend/plans.routes");
app.use("/api/plans", plansRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API rodando");
});

app.listen(PORT, () => {
  console.log("🚀 Macave Mining API rodando na porta " + PORT);
});
