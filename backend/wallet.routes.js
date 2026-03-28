const express = require('express');
const router = express.Router();

const { users } = require('./database');

router.post('/deposit', (req, res) => {
  const { username, amount } = req.body;

  const user = users.find(u => u.username === username);
  if(!user) return res.json({ message: 'Usuário não encontrado' });

  user.balance += Number(amount);

  res.json({ message: 'Depósito feito', balance: user.balance });
});

router.post('/withdraw', (req, res) => {
  const { username, amount } = req.body;

  const user = users.find(u => u.username === username);
  if(!user) return res.json({ message: 'Usuário não encontrado' });

  if(user.balance < amount){
    return res.json({ message: 'Saldo insuficiente' });
  }

  user.balance -= Number(amount);

  res.json({ message: 'Saque feito', balance: user.balance });
});

module.exports = router;
