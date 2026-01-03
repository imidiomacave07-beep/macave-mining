const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/auth", authRoutes);

// rota teste
app.get("/", (req, res) => {
  res.send("Macave Mining API a funcionar 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
