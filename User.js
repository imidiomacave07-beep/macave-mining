// User.js
const mongoose = require('mongoose');

// Define o schema do usuário
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Garante que não haja usuários duplicados
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cria o modelo de usuário
const User = mongoose.model('User', userSchema);

module.exports = User;
