const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// rota teste
app.get("/api", (req, res) => {
  res.json({ status: "Macave Mining API está online 🚀" });
});

// LOGIN LIVRE (ACEITA QUALQUER USUÁRIO)
app.post("/api/auth/login", (req, res) => {
  const { username } = req.body;

  return res.json({
    success: true,
    message: "Login bem-sucedido",
    user: { username }
  });
});

// REGISTER LIVRE
app.post("/api/auth/register", (req, res) => {
  const { username } = req.body;

  return res.json({
    success: true,
    message: "Registro bem-sucedido",
    user: { username }
  });
});

// fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// start server
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
