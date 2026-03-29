const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'uma_chave_secreta_segura';
const users = require('./users.routes').users;
const planos = require('./plans.routes').planos || [];

function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token necessário" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = users.find(u => u.username === payload.username);
    if (!req.user) return res.status(404).json({ message: "Usuário não encontrado" });
    next();
  } catch { res.status(401).json({ message: "Token inválido" }); }
}

router.get('/', auth, (req, res) => res.json(req.user.wallet));

router.post('/deposit', auth, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: "Valor inválido" });
  req.user.wallet.balance += amount;
  res.json({ message: `Depósito de $${amount} realizado`, balance: req.user.wallet.balance });
});

router.post('/buy-plan', auth, (req, res) => {
  const { planId, amount } = req.body;
  const plan = planos.find(p => p.id === planId);
  if (!plan) return res.status(404).json({ message: "Plano não encontrado" });
  if (amount < plan.minDeposit || amount > plan.maxDeposit) return res.status(400).json({ message: "Valor fora do permitido" });
  if (req.user.wallet.balance < amount) return res.status(400).json({ message: "Saldo insuficiente" });

  req.user.wallet.balance -= amount;
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + plan.term);

  req.user.wallet.activePlans.push({
    planId,
    amount,
    startDate,
    endDate,
    dailyROI: plan.dailyROI,
    accruedProfit: 0
  });

  res.json({ message: `Plano ${plan.nome} comprado com sucesso!`, balance: req.user.wallet.balance });
});

module.exports = router;
