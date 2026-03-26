const express = require('express');
const router = express.Router();

let users = [];

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if(users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }
  users.push({ username, password });
  res.json({ message: 'Registrado com sucesso' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return res.status(400).json({ message: 'Usuário ou senha inválidos' });
  res.json({ message: 'Login feito com sucesso' });
});

module.exports = router;
