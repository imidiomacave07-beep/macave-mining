const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Registro
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Dados do usuário logado
router.get('/me', authMiddleware, getMe);

module.exports = router;
