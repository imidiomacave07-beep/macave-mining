const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// servir ficheiros públicos
app.use(express.static(path.join(__dirname, "public")));

// rota principal
app.get("/", (req, res) => {
  res.send("Servidor Macave Mining está online 🚀");
});

// rotas da API
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
