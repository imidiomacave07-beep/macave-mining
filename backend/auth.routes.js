const express = require("express");
const router = express.Router();

// importa funções de login e registro
const { register, login } = require("./auth");

// rotas
router.post("/register", register);
router.post("/login", login);

// exporta router corretamente
module.exports = router;
