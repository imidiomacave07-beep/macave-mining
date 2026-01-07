const express = require("express");
const app = express();

app.use(express.json());

const dashboardRoutes = require("./src/routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
