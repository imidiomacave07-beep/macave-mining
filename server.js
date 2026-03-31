const express = require("express");
const app = express();

// Middleware básico
app.use(express.json());

// 🔥 ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("Macave Mining está online 🚀");
});

// 🔥 ROTA DE STATUS (IMPORTANTE)
app.get("/status", (req, res) => {
  res.json({
    status: "online",
    platform: "Macave Mining",
    message: "Servidor funcionando 🚀",
    time: new Date()
  });
});

// 🔥 EXEMPLO DE ROTA DE USUÁRIOS (para testes)
app.get("/admin/users", (req, res) => {
  res.json([
    {
      username: "TesteUser",
      email: "teste@email.com",
      plan: null,
      invested: 0,
      dailyProfit: 0,
      hashRate: 0
    }
  ]);
});

// 🔥 PORTA DO SERVIDOR
const PORT = process.env.PORT || 5000;

// 🔥 INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Macave Mining server running on port ${PORT}`);
});
