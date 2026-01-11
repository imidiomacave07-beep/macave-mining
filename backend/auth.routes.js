const express = require("express");
const router = express.Router();

let users = [];

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if(users.find(u => u.email === email)) return res.status(400).json({ error: "Email já registrado" });
  const user = { id: users.length+1, email, password, balance: 0, plans: [] };
  users.push(user);
  res.json({ message: "Registrado com sucesso", user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if(!user) return res.status(400).json({ error: "Email ou senha inválidos" });
  res.json({ message: "Login bem-sucedido", user });
});

module.exports = router;
