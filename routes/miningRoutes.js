const express = require('express');
const router = express.Router();
const { mine } = require('../controllers/miningController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/mine', authMiddleware, mine);

module.exports = router;
