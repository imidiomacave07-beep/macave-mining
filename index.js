const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const plansRoutes = require("./routes/plans.routes");
app.use("/plans", plansRoutes);

app.get("/", (req, res) => {
  res.send("Bem-vindo à Macave Mining!");
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
