const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar MongoDB:", error);
  }
};

module.exports = connectDB;
