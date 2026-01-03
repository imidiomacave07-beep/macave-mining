const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// servir pasta public
app.use(express.static(path.join(__dirname, "public")));

// rota raiz (IMPORTANTE)
app.get("/", (req, res) => {
  res.send("Macave Mining está online 🚀");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
