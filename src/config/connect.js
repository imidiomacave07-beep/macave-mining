const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar MongoDB:', err.message);
    process.exit(1); // encerra o app
  }
};

module.exports = connectDB;
