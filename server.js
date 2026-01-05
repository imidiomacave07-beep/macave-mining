const express = require("express");
const path = require("path");

const app = express();

// servir arquivos HTML
app.use(express.static(path.join(__dirname, "public")));

// rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
