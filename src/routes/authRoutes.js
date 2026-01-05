const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// rota de teste para login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // aqui você pode validar com o banco de dados
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ id: 1, username }, process.env.JWT_SECRET || "macave_secret", { expiresIn: "1d" });
    return res.json({ message: "Login bem-sucedido", token });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

// rota de registro simples
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // aqui você adicionaria no banco de dados
  res.json({ message: `Usuário ${username} registrado com sucesso!` });
});

module.exports = router;
