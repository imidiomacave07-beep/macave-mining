const express = require('express');
const router = express.Router();
const { registerUser, loginUser, mine } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/mine', authMiddleware, mine);

module.exports = router;
