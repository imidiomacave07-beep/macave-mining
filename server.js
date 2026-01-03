const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/plans", require("./src/routes/planRoutes"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("Servidor rodando na porta " + PORT)
);
