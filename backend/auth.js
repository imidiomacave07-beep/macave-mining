const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logActivity = require('./logger');
const router = express.Router();

const users = [];
const secret = "seusegredo";

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if(users.find(u => u.email === email)) return res.status(400).json({ error: "Usuário já existe" });
  const hashed = bcrypt.hashSync(password, 10);
  users.push({ id: Date.now(), email, password: hashed, balance: 0, plan: "basic" });
  logActivity(`Usuário registrado: ${email}`);
  res.json({ message: "Registro concluído" });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if(!user) return res.status(400).json({ error: "Usuário não encontrado" });
  if(!bcrypt.compareSync(password, user.password)) return res.status(400).json({ error: "Senha incorreta" });
  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
  logActivity(`Login bem-sucedido: ${email}`);
  res.json({ message: "Login sucesso", token });
});

module.exports = router;
