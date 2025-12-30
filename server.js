const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log(err));

/* Rotas */
app.use("/api/auth", require("./routes/authRoutes"));

/* Status */
app.get("/api/status", (req, res) => {
  res.json({ status: "Macave Mining API está rodando 🚀" });
});

/* Porta */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
