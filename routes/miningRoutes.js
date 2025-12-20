const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { mine } = require('../controllers/miningController');

router.post('/mine', auth, mine);

module.exports = router;
