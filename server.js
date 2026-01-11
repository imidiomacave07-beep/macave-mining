const express = require("express");
const cors = require("cors");
const path = require("path");

const plansRoutes = require("./backend/plans.routes");
app.use("/api/plans", plansRoutes);
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/plans", planRoutes);

// arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("🚀 Macave Mining API rodando na porta " + PORT)
);
