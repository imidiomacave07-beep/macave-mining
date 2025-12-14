// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../User'); // Modelo de usuário

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

        if (user.password !== password) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de registro (opcional)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: 'Usuário já existe' });

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
