// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

// Rotas
router.post('/register', register);
router.post('/login', login);

module.exports = router;
