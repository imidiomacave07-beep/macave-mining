const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rota raiz (opcional, se quiser abrir test-register.html direto)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test-register.html"));
});

app.listen(PORT, () => console.log(`Servidor ativo na porta ${PORT}`));
