const express = require("express");
const app = express();

app.use(express.json());

// ROTAS
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// rota raiz
app.get("/", (req, res) => {
  res.send("Macave Mining API está online 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
