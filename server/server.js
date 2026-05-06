const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crypto", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// ROTAS
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/deposit", require("./routes/deposit"));
app.use("/api/withdraw", require("./routes/withdraw"));
app.use("/api/mining", require("./routes/mining"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/2fa", require("./routes/twofa"));
app.use("/api/ai", require("./routes/ai"));

// ERROR
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
