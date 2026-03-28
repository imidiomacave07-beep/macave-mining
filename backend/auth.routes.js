const express = require('express');
const router = express.Router();

let users = [];

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if(users.find(u => u.username === username)){
    return res.json({ message: 'Usuário já existe' });
  }

  users.push({
    username,
    password,
    balance: 0,
    plans: []
  });

  res.json({ message: 'Conta criada com sucesso' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if(!user){
    return res.json({ message: 'Login inválido' });
  }

  res.json({ message: 'Login sucesso' });
});

module.exports = router;
