const express = require("express");
const app = express();

app.use(express.json());

/* =========================
   HEALTH CHECK (PING)
========================= */
app.get("/ping", (req, res) => {
  res.status(200).send("ok");
});

/* =========================
   ROTAS (IMPORTAÇÕES)
========================= */
// Exemplo (se tiveres routes)
const plansRoutes = require("./routes/plans.routes");
app.use("/plans", plansRoutes);

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
