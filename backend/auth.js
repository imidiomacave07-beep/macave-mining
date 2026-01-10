const express = require("express");
const router = express.Router();

// importa as funções de login e registro
const { register, login } = require("./auth");

// rota de registro
router.post("/register", register);

// rota de login
router.post("/login", login);

// exporta o router corretamente (muito importante)
module.exports = router;
