const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar MongoDB:", error);
  }
};

module.exports = connectDB;
