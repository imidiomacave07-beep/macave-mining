const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const plans = require("./backend/plans");
const purchasePlan = require("./backend/purchase");

app.get("/api/plans", (req, res) => {
  res.json(plans);
});

app.post("/api/plans/buy", purchasePlan);

app.listen(3000, () => {
  console.log("🚀 Macave Mining API rodando");
});
