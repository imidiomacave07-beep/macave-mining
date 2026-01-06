// controllers/dashboardController.js

// Simula dados do usuário e planos ativos
const getDashboard = (req, res) => {
  res.json({
    saldo: 0,
    planosAtivos: [
      { nome: "Plano Bronze", valor: "10 USD", status: "Ativo" },
      { nome: "Plano Prata", valor: "50 USD", status: "Ativo" }
    ]
  });
};

module.exports = { getDashboard };
